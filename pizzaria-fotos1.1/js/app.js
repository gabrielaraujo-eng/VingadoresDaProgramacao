/* app.js - comportamento das paginas (carrinho, abas do cardapio, pagina do prato, formularios).
   Depende de dados.js, que precisa ser carregado antes. O atributo data-page do <body> diz em qual pagina estamos. */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var page = document.body.dataset.page;

  /* ---------- pecas comuns: gradientes, pedido lateral, aviso ---------- */
  document.body.insertAdjacentHTML('beforeend',
    SVG_DEFS +
    '<button class="bar-order" id="barOrder" type="button" hidden><span id="barText">Ver pedido</span><span id="barTotal"></span></button>' +
    '<div class="toast" id="toast" role="status" hidden></div>' +
    '<div class="scrim" id="scrim" hidden></div>' +
    '<aside class="drawer" id="drawer" hidden aria-label="Seu pedido">' +
    '<div class="drawer-head"><h2>Seu pedido</h2><button class="x" type="button" data-close aria-label="Fechar pedido">×</button></div>' +
    '<div class="drawer-body"><div id="cartLines"></div><div class="totals" id="totals"></div>' +
    '<form id="orderForm" novalidate>' +
    '<fieldset class="seg field"><legend>Como receber</legend>' +
    '<label><input type="radio" name="tipo" value="entrega" checked><span>Entrega</span></label>' +
    '<label><input type="radio" name="tipo" value="retirada"><span>Retirada</span></label></fieldset>' +
    '<div class="field"><label for="oNome">Nome</label><input class="in" id="oNome" autocomplete="name"></div>' +
    '<div class="field" id="endField"><label for="oEnd">Endereço de entrega</label><input class="in" id="oEnd" autocomplete="street-address"></div>' +
    '<div class="field"><label for="oObs">Observações</label><textarea class="in" id="oObs" rows="3" placeholder="Sabores dos combos, sem cebola, troco para..."></textarea></div>' +
    '<button class="btn primary" type="submit" id="genBtn">Gerar resumo do pedido</button></form>' +
    '<div class="summary" id="summary" hidden><pre id="summaryText"></pre><button class="btn" type="button" id="copyBtn">Copiar resumo</button>' +
    '<p>Demonstração: o pedido não é enviado daqui. Copie o resumo e envie à pizzaria.</p></div></div></aside>');

  /* ---------- ilustracao por baixo das fotos (aparece se a foto nao carregar) ---------- */
  function preencherImagens(raiz) {
    (raiz || document).querySelectorAll('.media[data-art]').forEach(function (el) {
      if (el.dataset.pronto) return;
      var it = byId[el.dataset.art];
      el.insertAdjacentHTML('afterbegin', it ? itemArt(it) : art(el.dataset.art, ''));
      el.dataset.pronto = '1';
    });
  }

  /* ---------- aviso rapido ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 1800);
  }

  /* ---------- carrinho (guardado no navegador, vale para todas as paginas) ---------- */
  var cart = [];
  try { var saved = JSON.parse(localStorage.getItem('pizzaria-cart') || '[]'); if (Array.isArray(saved)) cart = saved.filter(function (l) { return byId[l.id] && l.qty > 0; }); } catch (e) {}
  function salvar() { try { localStorage.setItem('pizzaria-cart', JSON.stringify(cart)); } catch (e) {} }
  function unit(l) { var it = byId[l.id]; return it.prices ? it.prices[l.size] : it.price; }
  function subtotal() { return cart.reduce(function (s, l) { return s + unit(l) * l.qty; }, 0); }
  function totalItens() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function tipo() { return document.querySelector('input[name="tipo"]:checked').value; }

  function addLine(id, size, qty) {
    var it = byId[id], key = id + '|' + size;
    var line = cart.filter(function (l) { return l.key === key; })[0];
    if (line) line.qty += qty; else cart.push({ key: key, id: id, size: size, qty: qty });
    salvar(); desenharCarrinho();
    toast(qty + 'x ' + it.name + (it.prices ? ' (' + SIZES[size].n + ')' : '') + ' no pedido');
  }
  function mudarQtd(key, delta) {
    var l = cart.filter(function (x) { return x.key === key; })[0];
    if (!l) return;
    l.qty += delta;
    if (l.qty <= 0) cart = cart.filter(function (x) { return x !== l; });
    salvar(); desenharCarrinho();
  }
  function desenharCarrinho() {
    var n = totalItens(), sub = subtotal(), fee = n && tipo() === 'entrega' ? DELIVERY_FEE : 0;
    document.querySelectorAll('.count').forEach(function (c) { c.textContent = n; });
    $('#barOrder').hidden = n === 0 || !$('#drawer').hidden;
    $('#barText').textContent = 'Ver pedido, ' + n + (n === 1 ? ' item' : ' itens');
    $('#barTotal').textContent = brl(sub);
    if (!n) {
      $('#cartLines').innerHTML = '<p class="empty">Seu pedido está vazio. Escolha um prato no cardápio para começar.</p>';
      $('#totals').innerHTML = ''; $('#genBtn').disabled = true; $('#summary').hidden = true; return;
    }
    $('#genBtn').disabled = false;
    $('#cartLines').innerHTML = cart.map(function (l) {
      var it = byId[l.id];
      return '<div class="line"><div><b>' + esc(it.name) + '</b>' + (it.prices ? '<small>' + SIZES[l.size].n + ', ' + SIZES[l.size].d + '</small>' : '') + '</div><div class="lt">' + brl(unit(l) * l.qty) + '</div>' +
        '<div class="stepper" role="group" aria-label="Quantidade de ' + esc(it.name) + '"><button type="button" data-q="' + l.key + ':-1" aria-label="Diminuir">−</button><span>' + l.qty + '</span><button type="button" data-q="' + l.key + ':1" aria-label="Aumentar">+</button></div></div>';
    }).join('');
    $('#totals').innerHTML = '<div><span>Subtotal</span><span>' + brl(sub) + '</span></div>' +
      (fee ? '<div><span>Taxa de entrega</span><span>' + brl(fee) + '</span></div>' : '') +
      '<div class="big"><span>Total</span><span>' + brl(sub + fee) + '</span></div>';
  }
  function abrirPedido() { $('#drawer').hidden = false; $('#scrim').hidden = false; $('#barOrder').hidden = true; $('#drawer .x').focus(); }
  function fecharPedido() { if ($('#drawer').hidden) return; $('#drawer').hidden = true; $('#scrim').hidden = true; desenharCarrinho(); }

  var resumoPedido = '';
  function montarResumo() {
    var sub = subtotal(), fee = tipo() === 'entrega' ? DELIVERY_FEE : 0, linhas = [];
    linhas.push('PEDIDO PIZZARIA-PIZZARIA');
    var nome = $('#oNome').value.trim(); if (nome) linhas.push('Cliente: ' + nome);
    linhas.push(tipo() === 'entrega' ? 'Entrega' + ($('#oEnd').value.trim() ? ': ' + $('#oEnd').value.trim() : '') : 'Retirada no balcão');
    linhas.push('');
    cart.forEach(function (l) {
      var it = byId[l.id];
      linhas.push(l.qty + 'x ' + it.name + (it.prices ? ' (' + SIZES[l.size].n + ')' : '') + ' - ' + brl(unit(l) * l.qty));
    });
    linhas.push('');
    linhas.push('Subtotal: ' + brl(sub));
    if (fee) linhas.push('Taxa de entrega: ' + brl(fee));
    linhas.push('Total: ' + brl(sub + fee));
    var obs = $('#oObs').value.trim(); if (obs) { linhas.push(''); linhas.push('Obs.: ' + obs); }
    return linhas.join('\n');
  }

  /* ---------- horario de funcionamento (Home) ---------- */
  function desenharStatus() {
    var el = $('#status'); if (!el) return;
    var d = new Date(), m = d.getHours() * 60 + d.getMinutes(), dia = d.getDay();
    var aberto = dia !== 1 && m >= 18 * 60 && m < 23 * 60, t;
    el.classList.toggle('closed', !aberto);
    if (aberto) t = 'Aberto agora, até 23h';
    else if (dia === 1) t = 'Fechado hoje, abrimos terça às 18h';
    else if (m < 18 * 60) t = 'Fechado, abrimos hoje às 18h';
    else t = dia === 0 ? 'Fechado, abrimos terça às 18h' : 'Fechado, abrimos amanhã às 18h';
    $('#statusText').textContent = t;
  }

  /* ---------- Home: carrossel de promocoes ---------- */
  function iniciarHome() {
    desenharStatus(); setInterval(desenharStatus, 60000);
    var promos = $('#promos'), slides = promos.querySelectorAll('.slide'), atual = 0;
    function mostrar(i) {
      atual = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.hidden = k !== atual; });
      promos.dataset.slide = atual;
      $('#dots').innerHTML = Array.prototype.map.call(slides, function (s, k) {
        return '<button type="button" data-dot="' + k + '" aria-label="Promoção ' + (k + 1) + '"' + (k === atual ? ' aria-current="true"' : '') + '></button>';
      }).join('');
    }
    promos.addEventListener('click', function (e) {
      var seta = e.target.closest('[data-slide]'), ponto = e.target.closest('[data-dot]');
      if (seta) mostrar(atual + parseInt(seta.dataset.slide, 10));
      if (ponto) mostrar(parseInt(ponto.dataset.dot, 10));
    });
    mostrar(0);
  }

  /* ---------- Cardapio: abas e filtros (le ?cat=pizzas|sobremesa|combos|entradas na URL) ---------- */
  function iniciarCardapio() {
    var abas = document.querySelectorAll('[data-cat]'), listas = document.querySelectorAll('.lista');
    var mapa = { pizzas: 'pizzas', sobremesa: 'sobremesas', sobremesas: 'sobremesas', combos: 'combos', entradas: 'entradas' };
    function mostrar(cat, atualizarUrl) {
      var alvo = mapa[cat] || 'pizzas';
      abas.forEach(function (b) { var on = b.dataset.cat === alvo; b.setAttribute('aria-selected', on); b.classList.toggle('ativo', on); });
      listas.forEach(function (s) { s.hidden = s.id !== alvo; });
      if (atualizarUrl) { try { history.replaceState(null, '', '?cat=' + alvo); } catch (e) {} }
    }
    abas.forEach(function (b) { b.addEventListener('click', function () { mostrar(b.dataset.cat, true); }); });
    document.querySelectorAll('[data-filter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(function (c) { c.setAttribute('aria-pressed', c === chip); });
        document.querySelectorAll('#pizzas .grid > li').forEach(function (li) {
          li.hidden = !(f === 'todas' || (li.dataset.tags || '').split(',').indexOf(f) > -1);
        });
      });
    });
    mostrar(new URLSearchParams(location.search).get('cat') || 'pizzas', false);
  }

  /* ---------- Pagina do prato (le ?sabor=Nome na URL) ---------- */
  function iniciarPrato() {
    var it = acharPrato(new URLSearchParams(location.search).get('sabor')) || byId.calabresa;
    var tamanho = 0, qtd = 1, c = CATS[it.cat];
    function preco() { return it.prices ? it.prices[tamanho] : it.price; }
    document.title = it.name + ' - Pizzaria-Pizzaria';
    var tags = it.tags.length ? '<div class="tags">' + it.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' : '';
    var tamanhos = it.prices ? '<fieldset class="sizes"><legend>Tamanho</legend>' + it.prices.map(function (p, i) {
      return '<label><input type="radio" name="dsize" value="' + i + '"' + (i === 0 ? ' checked' : '') + '><span>' + SIZES[i].n + ' <small>' + SIZES[i].d + '</small></span><span class="sp">' + brl(p) + '</span></label>';
    }).join('') + '</fieldset>' : '<p class="eyebrow">' + esc(it.info) + '</p>';
    var aviso = it.cat === 'combos' || it.id === 'pastel' ? '<p class="note-combo">Informe ' + (it.cat === 'combos' ? 'os sabores' : 'o recheio') + ' nas observações do pedido, no carrinho.</p>' : '';
    var mesmos = ITEMS.filter(function (i) { return i.cat === it.cat; });
    var pos = mesmos.map(function (i) { return i.id; }).indexOf(it.id);
    var outros = [mesmos[(pos + 1) % mesmos.length], mesmos[(pos + 2) % mesmos.length], mesmos[(pos + 3) % mesmos.length]];
    function rapido(x) {
      return '<div class="qa"><span class="qa-art">' + mediaHTML(x) + '</span><b>' + esc(x.name) + '</b><span class="price">' + brl(x.price) + '</span><button class="btn small" type="button" data-quick="' + x.id + '">Adicionar</button></div>';
    }
    var sobremesas = ITEMS.filter(function (i) { return i.cat === 'sobremesa' && i.id !== it.id; }).slice(0, 4);
    var entradas = ITEMS.filter(function (i) { return i.cat === 'entradas' && i.id !== it.id; }).slice(0, 4);

    $('#detalhe').innerHTML =
      '<nav class="crumbs" aria-label="Você está em"><a href="../Home/index.html">Home</a> / <a href="../Cadapio/cardapio.html?cat=' + it.cat + '">' + (c.title || c.n) + '</a> / <span>' + esc(it.name) + '</span></nav>' +
      '<div class="detail"><div class="d-art">' + mediaHTML(it) + '</div><div class="d-info">' +
      '<p class="eyebrow">' + c.one + '</p><h1>' + esc(it.name) + '</h1>' + tags +
      '<p class="d-desc">' + esc(it.desc) + '</p>' +
      '<div class="comp"><h3>Composição</h3><ul>' + it.ing.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul></div>' +
      tamanhos + aviso +
      '<div class="valor"><small>Valor:</small><strong id="dValor"></strong></div>' +
      '<div class="buy"><div class="stepper" role="group" aria-label="Quantidade"><button type="button" data-dq="-1" aria-label="Diminuir">−</button><span id="dQty">1</span><button type="button" data-dq="1" aria-label="Aumentar">+</button></div>' +
      '<button class="btn primary" type="button" id="dAdd"></button></div></div></div>' +
      '<div class="accs">' +
      '<details class="acc"><summary>Sobremesa?...</summary><div class="acc-body">' + sobremesas.map(rapido).join('') + '</div></details>' +
      '<details class="acc"><summary>Adicionar mais pedidos</summary><div class="acc-body">' + entradas.map(rapido).join('') + '</div></details></div>' +
      '<div class="section-head"><h2>' + (it.cat === 'pizzas' ? 'Outros sabores que você goste também' : 'Outras opções que você pode gostar') + '</h2></div>' +
      '<div class="more">' + outros.map(function (x) { return cardHTML(x, 'pratos.html'); }).join('') + '</div>';
    preencherImagens($('#detalhe'));

    function atualizar() {
      $('#dValor').textContent = brl(preco());
      $('#dQty').textContent = qtd;
      $('#dAdd').textContent = 'Adicionar ao pedido, ' + brl(preco() * qtd);
    }
    atualizar();
    $('#detalhe').addEventListener('click', function (e) {
      var q = e.target.closest('[data-dq]');
      if (q) { qtd = Math.max(1, Math.min(20, qtd + parseInt(q.dataset.dq, 10))); atualizar(); return; }
      if (e.target.closest('#dAdd')) addLine(it.id, it.prices ? tamanho : 0, qtd);
    });
    $('#detalhe').addEventListener('change', function (e) {
      if (e.target.name === 'dsize') { tamanho = parseInt(e.target.value, 10); atualizar(); }
    });
  }

  /* ---------- Reserva ---------- */
  function iniciarReserva() {
    var p = '', h = '';
    for (var i = 1; i <= 10; i++) p += '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + i + (i === 1 ? ' pessoa' : ' pessoas') + '</option>';
    for (var m = 18 * 60; m <= 22 * 60 + 30; m += 30) {
      var hh = String(Math.floor(m / 60)).padStart(2, '0'), mm = String(m % 60).padStart(2, '0');
      h += '<option value="' + hh + ':' + mm + '"' + (m === 20 * 60 ? ' selected' : '') + '>' + hh + ':' + mm + '</option>';
    }
    $('#rPessoas').innerHTML = p; $('#rHora').innerHTML = h;
    var agora = new Date(), iso = agora.getFullYear() + '-' + String(agora.getMonth() + 1).padStart(2, '0') + '-' + String(agora.getDate()).padStart(2, '0');
    $('#rData').min = iso; $('#rData').value = iso;
    $('#goForm').addEventListener('click', function (e) { e.preventDefault(); $('#cadastroReserva').scrollIntoView(); $('#rNome').focus(); });
    $('#rsvForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = $('#rNome').value.trim(), data = $('#rData').value, res = $('#rResult');
      res.hidden = false;
      if (!nome || !$('#rEmail').value.trim() || !$('#rTel').value.trim() || !data) { res.textContent = 'Preencha nome, e-mail, telefone e data para confirmar a reserva.'; return; }
      var d = new Date(data + 'T12:00:00');
      if (d.getDay() === 1) { res.textContent = 'Fechamos às segundas. Escolha uma data de terça a domingo.'; return; }
      var np = $('#rPessoas').value;
      res.textContent = 'Reserva para ' + np + (np === '1' ? ' pessoa' : ' pessoas') + ', ' + d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }) + ', às ' + $('#rHora').value + ', em nome de ' + nome + '. Demonstração: nenhuma reserva é enviada daqui.';
    });
  }

  /* ---------- Contato ---------- */
  function iniciarContato() {
    $('#form-contato').addEventListener('submit', function (e) {
      e.preventDefault();
      var res = $('#ok'); res.hidden = false;
      if (!$('#mNome').value.trim() || !$('#mMsg').value.trim()) { res.textContent = 'Escreva seu nome e a mensagem.'; return; }
      res.textContent = 'Mensagem registrada nesta página. Demonstração: nada é enviado para a pizzaria.';
    });
  }

  /* ---------- menu do celular ---------- */
  var botaoMenu = $('.menu-btn'), topo = $('.top');
  if (botaoMenu) {
    botaoMenu.addEventListener('click', function () {
      var aberto = topo.classList.toggle('menu-aberto');
      botaoMenu.setAttribute('aria-expanded', aberto);
      botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
  }

  /* ---------- eventos comuns (carrinho) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('[data-open-cart]') || t.closest('#barOrder')) { abrirPedido(); return; }
    if (t.closest('[data-close]') || t === $('#scrim')) { fecharPedido(); return; }
    var rapido = t.closest('[data-quick]');
    if (rapido) { addLine(rapido.dataset.quick, 0, 1); return; }
    var q = t.closest('[data-q]');
    if (q) { var partes = q.dataset.q.split(':'); mudarQtd(partes[0], parseInt(partes[1], 10)); return; }
    if (t.closest('[data-info]')) { e.preventDefault(); toast('Esta página não faz parte da demonstração'); return; }
    if (t.closest('#copyBtn')) {
      var feito = function () { toast('Resumo copiado'); };
      var plano = function () {
        var r = document.createRange(); r.selectNodeContents($('#summaryText'));
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); toast('Selecionado: use copiar do seu aparelho');
      };
      try { navigator.clipboard.writeText(resumoPedido).then(feito, plano); } catch (err) { plano(); }
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.name === 'tipo') { $('#endField').hidden = tipo() !== 'entrega'; desenharCarrinho(); $('#summary').hidden = true; }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharPedido(); });
  $('#orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!totalItens()) return;
    resumoPedido = montarResumo();
    $('#summaryText').textContent = resumoPedido;
    $('#summary').hidden = false;
    $('#summary').scrollIntoView({ block: 'nearest' });
  });

  /* ---------- inicio ---------- */
  if (page === 'home') iniciarHome();
  if (page === 'cardapio') iniciarCardapio();
  if (page === 'prato') iniciarPrato();
  if (page === 'reserva') iniciarReserva();
  if (page === 'contato') iniciarContato();
  preencherImagens();
  desenharCarrinho();
})();