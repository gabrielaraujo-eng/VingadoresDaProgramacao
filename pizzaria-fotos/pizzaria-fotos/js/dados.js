/* dados.js - dados dos pratos, ilustracoes e funcoes usadas por todas as paginas.
   Para mudar preco, descricao ou composicao de um prato, procure o nome dele na lista ITEMS. */

var DELIVERY_FEE = 6;
var brl = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

/* ---------- dados ---------- */
var SIZES = [{ n: 'Broto', d: '4 fatias' }, { n: 'Média', d: '6 fatias' }, { n: 'Grande', d: '8 fatias' }];
var CATS = {
  pizzas: { n: 'Pizzas', one: 'Sabor selecionado', note: 'Preço por tamanho: broto com 4 fatias, média com 6, grande com 8.' },
  sobremesa: { n: 'Sobremesa', title: 'Sobremesas', one: 'Item selecionado', note: 'Para a mesa ou para viagem.' },
  combos: { n: 'Combos', one: 'Combo selecionado', note: 'Bebida inclusa. Informe os sabores nas observações do pedido.' },
  entradas: { n: 'Entradas', one: 'Item selecionado', note: 'Para dividir enquanto o forno trabalha.' }
};
function P(id, name, desc, ing, tags, prices, top) { return { id: id, cat: 'pizzas', name: name, desc: desc, ing: ing, tags: tags, prices: prices, top: top }; }
function O(id, cat, name, price, art, info, desc, ing, tags) { return { id: id, cat: cat, name: name, price: price, art: art, info: info, desc: desc, ing: ing, tags: tags || [] }; }
var ITEMS = [
  P('calabresa', 'Calabresa', 'Clássica brasileira: linguiça calabresa fatiada fininha, cebola roxa e azeitonas pretas sobre mussarela derretida e molho de tomate caseiro. A cebola fica levemente caramelizada no calor do forno a lenha.', ['Molho de tomate caseiro', 'Mussarela', 'Linguiça calabresa', 'Cebola roxa', 'Azeitona preta', 'Orégano'], ['Mais pedida', 'Picante'], [25, 42, 55], [['moz', 4], ['cal', 11], ['cebola', 8], ['oli', 4]]),
  P('mussarela', 'Mussarela', 'A base de tudo: mussarela cremosa em generosa camada, azeitonas e um toque de orégano. Simples, macia e perfeita para quem quer sabor sem complicação.', ['Molho de tomate caseiro', 'Mussarela', 'Azeitona preta', 'Orégano'], ['Vegetariana'], [24, 40, 52], [['moz', 10], ['oli', 4], ['ore', 14]]),
  P('marguerita', 'Marguerita', 'Inspirada na pizza napolitana: mussarela de búfala, tomate fatiado, manjericão fresco colhido na hora e um fio de azeite. É a mais leve do cardápio.', ['Molho de tomate caseiro', 'Mussarela de búfala', 'Tomate', 'Manjericão fresco', 'Azeite extravirgem'], ['Vegetariana'], [27, 45, 58], [['moz', 6], ['tom', 5], ['basil', 7]]),
  P('napolitana', 'Napolitana', 'Mussarela, rodelas de tomate maduro, parmesão ralado e orégano. Tem acidez e salinidade na medida, com a borda macia típica da massa de 48 horas.', ['Molho de tomate caseiro', 'Mussarela', 'Tomate', 'Parmesão', 'Orégano'], ['Vegetariana'], [27, 45, 58], [['moz', 4], ['tom', 6], ['ore', 14]]),
  P('pepperoni', 'Pepperoni', 'Fatias generosas de pepperoni levemente picante, que soltam um óleo avermelhado e deixam a borda crocante. Para quem gosta de sabor marcante.', ['Molho de tomate caseiro', 'Mussarela', 'Pepperoni'], ['Picante'], [29, 48, 62], [['pep', 14]]),
  P('brasileira', 'Brasileira', 'Frango desfiado temperado, catupiry cremoso, milho e azeitonas pretas. Uma combinação doce e salgada que agrada de criança a avô.', ['Molho de tomate caseiro', 'Mussarela', 'Frango desfiado', 'Catupiry', 'Milho', 'Azeitona preta'], [], [28, 46, 60], [['frango', 8], ['catu', 6], ['corn', 12], ['oli', 4]]),
  P('portuguesa', 'Portuguesa', 'Presunto, ovo cozido em rodelas, cebola, ervilha e azeitonas sobre mussarela. A mais completa das tradicionais, com muitas texturas em cada fatia.', ['Molho de tomate caseiro', 'Mussarela', 'Presunto', 'Ovo cozido', 'Cebola', 'Ervilha', 'Azeitona preta'], [], [28, 46, 60], [['pres', 8], ['ovo', 4], ['cebola', 6], ['ervilha', 8], ['oli', 5]]),
  P('country', 'Country', 'Frango em cubos, milho, bacon crocante e catupiry sobre mussarela. Defumado e cremoso na mesma mordida.', ['Molho de tomate caseiro', 'Mussarela', 'Frango', 'Milho', 'Bacon', 'Catupiry'], [], [30, 50, 64], [['frango', 7], ['corn', 9], ['bacon', 7], ['catu', 4]]),
  P('supreme', 'Supreme', 'A especial da casa: pepperoni, calabresa, pimentão, cogumelo, cebola e azeitonas. Muitos ingredientes, todos picados em pedaços pequenos para dividir bem a pizza.', ['Molho de tomate caseiro', 'Mussarela', 'Pepperoni', 'Calabresa', 'Pimentão', 'Cogumelo', 'Cebola', 'Azeitona preta'], ['Especial da casa', 'Picante'], [33, 54, 70], [['pep', 6], ['cal', 5], ['pim', 5], ['cog', 5], ['cebola', 5], ['oli', 5]]),

  O('pudim', 'sobremesa', 'Pudim', 14, 'pudim', 'Serve 1 pessoa', 'Pudim de leite condensado, denso e liso, coberto com calda de caramelo feita na hora. Fatia grande, gelada, para fechar a refeição sem pesar.', ['Leite condensado', 'Leite', 'Ovos', 'Açúcar caramelizado']),
  O('brownie', 'sobremesa', 'Brownie', 18, 'brownie', 'Serve 1 pessoa', 'Brownie de chocolate meio amargo servido quente, com casquinha crocante por fora e miolo úmido. Acompanha calda de chocolate e nozes picadas.', ['Chocolate meio amargo', 'Manteiga', 'Ovos', 'Nozes', 'Calda de chocolate']),
  O('sorvete', 'sobremesa', 'Sorvete', 12, 'sorvete', 'Serve 1 pessoa', 'Três bolas de sorvete de creme, chocolate e morango na casquinha ou no copo. Gelado e leve, para quem quer algo simples no final.', ['Sorvete de creme', 'Sorvete de chocolate', 'Sorvete de morango', 'Casquinha ou copo']),
  O('tortalimao', 'sobremesa', 'Torta Limão', 16, 'limao', 'Serve 1 pessoa', 'Base de biscoito amanteigado, creme de limão e merengue maçaricado. Azedinha e doce na medida, com a cobertura levemente tostada.', ['Biscoito amanteigado', 'Creme de limão', 'Merengue maçaricado']),
  O('mousse', 'sobremesa', 'Mousse Choc.', 14, 'mousse', 'Serve 1 pessoa', 'Mousse aerado de chocolate ao leite servido em copinho e finalizado com raspas de chocolate. Textura leve e sabor bem presente.', ['Chocolate ao leite', 'Creme de leite', 'Claras em neve', 'Raspas de chocolate']),
  O('cheesecake', 'sobremesa', 'Cheesecake', 20, 'cheesecake', 'Serve 1 pessoa', 'Cheesecake cremoso assado em banho-maria, com base crocante de biscoito e calda de frutas vermelhas. Servido gelado.', ['Cream cheese', 'Biscoito', 'Ovos', 'Calda de frutas vermelhas']),
  O('petitgateau', 'sobremesa', 'Petit Gateau', 24, 'gateau', 'Serve 1 pessoa. Preparo em cerca de 12 minutos', 'Bolinho de chocolate com o centro derretido, servido quente com sorvete de creme. Sai do forno só depois do pedido, por isso leva alguns minutos.', ['Chocolate', 'Manteiga', 'Ovos', 'Farinha', 'Sorvete de creme']),
  O('acai', 'sobremesa', 'Açaí', 18, 'acai', 'Serve 1 pessoa', 'Açaí batido na hora, servido na tigela com banana, granola e leite condensado. Opção gelada e energética.', ['Açaí', 'Banana', 'Granola', 'Leite condensado']),
  O('bananasplit', 'sobremesa', 'Banana Split', 22, 'split', 'Serve 1 a 2 pessoas', 'Banana fatiada ao meio com três bolas de sorvete, calda de chocolate, chantilly e cereja. Clássica, boa para dividir.', ['Banana', 'Sorvete de creme, chocolate e morango', 'Calda de chocolate', 'Chantilly', 'Cereja']),

  O('familia', 'combos', 'Combo Família', 98, 'c4', 'Serve 4 a 5 pessoas', 'Pensado para a mesa cheia: uma pizza grande de um sabor, uma pizza broto doce e refrigerante de 2 litros. Informe os sabores nas observações do pedido.', ['Pizza grande (1 sabor)', 'Pizza broto doce', 'Refrigerante 2 L']),
  O('casal', 'combos', 'Combo Casal', 72, 'c2', 'Serve 2 pessoas', 'Pizza média de um sabor, duas sobremesas do dia e refrigerante de 1 litro. Boa pedida para dividir sem pensar muito.', ['Pizza média (1 sabor)', '2 sobremesas do dia', 'Refrigerante 1 L']),
  O('individual', 'combos', 'Combo Individual', 32, 'c1', 'Serve 1 pessoa', 'Pizza broto de um sabor e refrigerante em lata. Resolve o jantar de uma pessoa com preço fechado.', ['Pizza broto (1 sabor)', 'Refrigerante lata']),
  O('kids', 'combos', 'Combo Kids', 36, 'c1', 'Serve 1 criança', 'Pizza broto de mussarela cortada em pedaços pequenos, suco de caixinha e uma bola de sorvete de sobremesa.', ['Pizza broto de mussarela', 'Suco de caixinha', 'Bola de sorvete']),
  O('executivo', 'combos', 'Combo Executivo', 44, 'c2', 'Serve 1 pessoa', 'Pizza broto de um sabor, salada Caesar e refrigerante em lata. Uma refeição completa e rápida.', ['Pizza broto (1 sabor)', 'Salada Caesar', 'Refrigerante lata']),
  O('festa', 'combos', 'Combo Festa', 160, 'c3', 'Serve 8 a 10 pessoas', 'Três pizzas grandes, duas entradas e dois refrigerantes de 2 litros para comemorações. Escolha os sabores nas observações.', ['3 pizzas grandes', '2 entradas', '2 refrigerantes 2 L']),
  O('light', 'combos', 'Combo Light', 46, 'c2', 'Serve 1 pessoa', 'Pizza broto de marguerita, salada Caesar e suco natural sem açúcar. A combinação mais leve do cardápio.', ['Pizza broto de marguerita', 'Salada Caesar', 'Suco natural sem açúcar'], ['Vegetariana']),
  O('premium', 'combos', 'Combo Premium', 110, 'c3', 'Serve 3 a 4 pessoas', 'Pizza grande Supreme, porção de provolone grelhado e dois refrigerantes de 1 litro.', ['Pizza grande Supreme', 'Provolone grelhado', '2 refrigerantes 1 L']),
  O('surpresa', 'combos', 'Combo Surpresa', 59, 'c1', 'Serve 2 pessoas', 'A cozinha escolhe o sabor da pizza média do dia e você recebe junto com um refrigerante de 1 litro. Informe alergias nas observações.', ['Pizza média sabor do dia', 'Refrigerante 1 L']),

  O('batata', 'entradas', 'Batata Frita', 24, 'fries', 'Serve 2 pessoas', 'Porção de batata frita sequinha e crocante, temperada com sal e ervas. Acompanha molho da casa.', ['Batata', 'Sal e ervas', 'Molho da casa'], ['Vegetariana']),
  O('onion', 'entradas', 'Onion Rings', 22, 'onion', 'Serve 2 pessoas', 'Anéis de cebola empanados e fritos até dourar, acompanhados de molho barbecue.', ['Cebola', 'Farinha empanada', 'Molho barbecue'], ['Vegetariana']),
  O('bolinho', 'entradas', 'Bolinho de Bacalhau', 32, 'bolinho', 'Porção com 6 unidades', 'Seis bolinhos de bacalhau com massa de batata e salsa, crocantes por fora e macios por dentro.', ['Bacalhau', 'Batata', 'Salsa', 'Cebola']),
  O('bruschetta', 'entradas', 'Bruschetta', 22, 'bruschetta', 'Porção com 4 torradas', 'Quatro torradas de pão italiano com tomate picado, alho, manjericão e azeite. Leve e fresca.', ['Pão italiano', 'Tomate', 'Alho', 'Manjericão', 'Azeite'], ['Vegetariana']),
  O('isca', 'entradas', 'Isca de Frango', 30, 'isca', 'Serve 2 pessoas', 'Iscas de peito de frango empanadas, crocantes, com molho de mostarda e mel.', ['Peito de frango', 'Farinha empanada', 'Molho de mostarda e mel']),
  O('pastel', 'entradas', 'Pastel', 20, 'pastel', 'Porção com 2 unidades', 'Dois pastéis grandes de massa fina e sequinha, recheados com queijo ou carne. Escolha o recheio nas observações.', ['Massa de pastel', 'Queijo ou carne moída temperada']),
  O('caesar', 'entradas', 'Salada Caesar', 26, 'salad', 'Serve 1 pessoa', 'Alface americana, croutons, lascas de parmesão e molho Caesar. Opção leve para começar.', ['Alface americana', 'Croutons', 'Parmesão', 'Molho Caesar'], ['Vegetariana']),
  O('provolone', 'entradas', 'Provolone', 28, 'provolone', 'Serve 2 pessoas', 'Fatia grossa de queijo provolone grelhada no forno até derreter, com orégano e azeite. Acompanha torradas.', ['Queijo provolone', 'Orégano', 'Azeite', 'Torradas'], ['Vegetariana']),
  O('camarao', 'entradas', 'Camarão Empanado', 42, 'camarao', 'Porção com 8 unidades', 'Oito camarões grandes empanados na farinha panko, fritos na hora e servidos com molho tártaro.', ['Camarão', 'Farinha panko', 'Molho tártaro'])
];
var byId = {}; ITEMS.forEach(function (i) { byId[i.id] = i; });
var ORDER = ['pizzas', 'sobremesa', 'combos', 'entradas'];

/* ---------- ilustrações (tábua escura, luz e sombra) ---------- */
function rng(str) {
  var h = 1779033703 ^ str.length;
  for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  var a = h >>> 0;
  return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function topping(t, x, y, rot) {
  x = x.toFixed(1); y = y.toFixed(1);
  var g = 'transform="translate(' + x + ' ' + y + ') rotate(' + rot.toFixed(0) + ')"';
  switch (t) {
    case 'pep': return '<g ' + g + '><circle r="4.7" fill="url(#gPep)" stroke="#6A120C" stroke-opacity=".6" stroke-width=".5"/><ellipse cx="-1.4" cy="-1.6" rx="1.5" ry=".8" fill="#fff" opacity=".28"/><circle cx="1.6" cy="1.3" r=".6" fill="#6A120C" opacity=".6"/></g>';
    case 'cal': return '<g ' + g + '><circle r="4" fill="url(#gCal)" stroke="#7E3822" stroke-width=".7"/><circle r="1.1" fill="#A04E33" opacity=".7"/><ellipse cx="-1.2" cy="-1.5" rx="1.3" ry=".7" fill="#fff" opacity=".25"/></g>';
    case 'moz': return '<ellipse ' + g + ' rx="6.2" ry="4.2" fill="#FFF9E6" opacity=".92"/>';
    case 'basil': return '<g ' + g + '><path d="M-4.8 0 Q0 -3.6 4.8 0 Q0 3.6 -4.8 0Z" fill="url(#gLeaf)"/><path d="M-4 0 H4" stroke="#1B4A25" stroke-opacity=".5" stroke-width=".4"/></g>';
    case 'tom': return '<g ' + g + '><circle r="4.4" fill="url(#gTom)" stroke="#9E2617" stroke-width=".6"/><circle r="2.3" fill="#F7A18E" opacity=".55"/><ellipse cx="-1.3" cy="-1.5" rx="1.3" ry=".7" fill="#fff" opacity=".3"/></g>';
    case 'oli': return '<g><circle cx="' + x + '" cy="' + y + '" r="2.5" fill="none" stroke="#1C1614" stroke-width="1.8"/><circle cx="' + x + '" cy="' + y + '" r="1.1" fill="#8E2A1C" opacity=".7"/></g>';
    case 'cebola': return '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="none" stroke="#EBD4E6" stroke-opacity=".9" stroke-width="1.2"/>';
    case 'corn': return '<circle cx="' + x + '" cy="' + y + '" r="1.7" fill="#F3C23A" stroke="#C99A1E" stroke-width=".3"/>';
    case 'ervilha': return '<circle cx="' + x + '" cy="' + y + '" r="1.6" fill="#5E9F3E" stroke="#3E7A28" stroke-width=".3"/>';
    case 'ore': return '<circle cx="' + x + '" cy="' + y + '" r=".8" fill="#3C7A33"/>';
    case 'frango': return '<ellipse ' + g + ' rx="4.2" ry="2.5" fill="#F3DCB4" stroke="#CFA060" stroke-width=".6"/>';
    case 'bacon': return '<g ' + g + '><rect x="-3.8" y="-1.4" width="7.6" height="2.8" rx="1" fill="#B8503C"/><rect x="-3.4" y="-.4" width="6.8" height=".8" fill="#F2C9B8"/></g>';
    case 'cog': return '<g ' + g + '><ellipse rx="3.8" ry="2.5" fill="#EFE5D4" stroke="#B7A58A" stroke-width=".6"/><path d="M-2.6 .6 H2.6" stroke="#B7A58A" stroke-width=".4"/></g>';
    case 'pim': return '<circle cx="' + x + '" cy="' + y + '" r="3.1" fill="none" stroke="#3E9444" stroke-width="1.8" stroke-dasharray="14 5"/>';
    case 'catu': return '<circle cx="' + x + '" cy="' + y + '" r="2.9" fill="#FFFDF2" opacity=".96"/>';
    case 'pres': return '<rect ' + g + ' x="-3.2" y="-2.7" width="6.4" height="5.4" rx="1" fill="#EE9F9A" stroke="#C9726D" stroke-width=".4"/>';
    case 'ovo': return '<g ' + g + '><circle r="4.2" fill="#FFFFFF" stroke="#E4DCCB" stroke-width=".5"/><circle r="1.9" fill="#F2B833"/></g>';
  }
  return '';
}
var BOARD = '<circle cx="50" cy="52" r="47" fill="url(#gBoard)" filter="url(#fShadow)"/><path d="M12 38 Q50 28 88 40 M8 54 Q50 46 92 56 M14 70 Q50 64 86 72" stroke="#2A170A" stroke-opacity=".35" stroke-width=".6" fill="none"/>';
var LIGHT = '<circle cx="50" cy="52" r="47" fill="url(#gLight)"/>';
function pizzaArt(top, seed, label) {
  var r = rng(seed), s = BOARD;
  s += '<circle cx="50" cy="51" r="40" fill="url(#gCrust)" filter="url(#fTop)"/>';
  for (var c = 0; c < 18; c++) {
    var ca = r() * 6.283, cr = 35 + r() * 4.2;
    s += '<ellipse cx="' + (50 + Math.cos(ca) * cr).toFixed(1) + '" cy="' + (51 + Math.sin(ca) * cr).toFixed(1) + '" rx="' + (1.2 + r() * 2).toFixed(1) + '" ry="' + (.7 + r() * 1.1).toFixed(1) + '" fill="#5B3010" opacity="' + (.25 + r() * .3).toFixed(2) + '" transform="rotate(' + (ca * 57.3).toFixed(0) + ' ' + (50 + Math.cos(ca) * cr).toFixed(1) + ' ' + (51 + Math.sin(ca) * cr).toFixed(1) + ')"/>';
  }
  s += '<circle cx="50" cy="51" r="34.5" fill="url(#gSauce)"/><circle cx="50" cy="51" r="33.2" fill="url(#gCheese)"/>';
  for (var b = 0; b < 22; b++) {
    var ba = r() * 6.283, br = Math.sqrt(r()) * 31, light = r() > .45;
    s += '<circle cx="' + (50 + Math.cos(ba) * br).toFixed(1) + '" cy="' + (51 + Math.sin(ba) * br).toFixed(1) + '" r="' + (1 + r() * 3.2).toFixed(1) + '" fill="' + (light ? '#FFF3C8' : '#D9962F') + '" opacity="' + (light ? '.55' : '.4') + '"/>';
  }
  s += '<g filter="url(#fTop)">';
  top.forEach(function (tn) {
    for (var i = 0; i < tn[1]; i++) {
      var a = r() * 6.283, rad = Math.sqrt(r()) * 28.5;
      s += topping(tn[0], 50 + Math.cos(a) * rad, 51 + Math.sin(a) * rad, r() * 180);
    }
  });
  s += '</g>' + LIGHT;
  return '<svg viewBox="0 0 100 100" role="img" aria-label="' + esc(label) + '">' + s + '</svg>';
}
var PLATE = '<circle cx="50" cy="52" r="38" fill="url(#gPlate)" filter="url(#fShadow)"/><circle cx="50" cy="52" r="30" fill="none" stroke="#C9C2BA" stroke-opacity=".7" stroke-width="1"/>';
var FLAT = [
  ['#D79A4B', 'url(#gGold)'], ['#E0A85C', 'url(#gGold)'], ['#E8B263', 'url(#gCrust)'], ['#F0C85A', 'url(#gGold)'], ['#F2C94C', 'url(#gGold)'],
  ['#4A2A1A', 'url(#gChoc)'], ['#5B2E1C', 'url(#gChoc)'], ['#5A2E1D', 'url(#gChoc)'], ['#3B2314', 'url(#gChoc)'], ['#7A4A32', 'url(#gChoc)'], ['#6B3A22', 'url(#gChoc)'],
  ['#F7E7C2', 'url(#gCream)'], ['#FFF4DC', 'url(#gCream)'], ['#F5E2B0', 'url(#gCream)'], ['#F6D67B', 'url(#gCheese)'],
  ['#C8302A', 'url(#gTom)'], ['#D8402E', 'url(#gTom)'], ['#CF3A2A', 'url(#gPep)'], ['#B3261E', 'url(#gPep)'],
  ['#3F9A45', 'url(#gLeaf)'], ['#2F7D3F', 'url(#gLeaf)'], ['#4C9A52', 'url(#gLeaf)']
];
function art(kind, label) {
  var s = '';
  switch (kind) {
    case 'brownie': s = '<rect x="26" y="44" width="38" height="26" rx="3" fill="#4A2A1A"/><rect x="26" y="44" width="38" height="7" rx="3" fill="#6B3A22"/><circle cx="62" cy="42" r="11" fill="#F7E7C2"/><path d="M30 48 q6 5 12 0 t12 0" fill="none" stroke="#2D170D" stroke-width="2"/>'; break;
    case 'gateau': s = '<path d="M27 68 Q27 36 50 36 Q73 36 73 68 Z" fill="#5B2E1C"/><path d="M40 52 q10 8 20 0" fill="none" stroke="#8B4B2B" stroke-width="3"/><circle cx="50" cy="33" r="6" fill="#C8302A"/><path d="M47 28 l3 -4 l3 4" fill="#3F9A45"/><circle cx="36" cy="44" r="1.2" fill="#fff"/><circle cx="62" cy="48" r="1.2" fill="#fff"/>'; break;
    case 'pudim': s = '<path d="M30 70 L36 40 Q50 34 64 40 L70 70 Z" fill="#E8A23D"/><path d="M36 40 Q50 34 64 40 L63 46 Q50 41 37 46 Z" fill="#7A3E10"/><path d="M26 72 Q50 78 74 72" fill="none" stroke="#7A3E10" stroke-width="3" stroke-linecap="round"/>'; break;
    case 'sorvete': s = '<path d="M38 54 L50 86 L62 54 Z" fill="#D79A4B"/><path d="M42 60 L58 60 M45 68 L55 68" stroke="#A8692B" stroke-width="1.5"/><circle cx="42" cy="50" r="11" fill="#F7D1D9"/><circle cx="58" cy="50" r="11" fill="#F7E7C2"/><circle cx="50" cy="38" r="11" fill="#7A4A32"/>'; break;
    case 'limao': s = '<path d="M50 70 L22 46 Q50 28 78 46 Z" fill="#E8B263"/><path d="M50 62 L30 46 Q50 36 70 46 Z" fill="#F2E27A"/><path d="M34 42 q8 -8 16 -4 q8 -4 16 4" fill="none" stroke="#FFF7E2" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="32" r="4" fill="#3F9A45"/>'; break;
    case 'mousse': s = '<path d="M32 40 H68 L62 72 H38 Z" fill="#5A2E1D"/><path d="M32 40 H68" stroke="#D9CFC6" stroke-width="3"/><path d="M36 40 q14 -14 28 0" fill="#7A4A32"/><circle cx="50" cy="31" r="4" fill="#C8302A"/>'; break;
    case 'cheesecake': s = '<path d="M24 62 L76 62 L68 44 L32 44 Z" fill="#F5E2B0"/><rect x="24" y="62" width="52" height="8" fill="#A8692B"/><path d="M32 44 L68 44 L66 40 L34 40 Z" fill="#B3261E"/><circle cx="40" cy="37" r="3" fill="#7A1A24"/><circle cx="52" cy="36" r="3" fill="#7A1A24"/><circle cx="62" cy="38" r="3" fill="#7A1A24"/>'; break;
    case 'acai': s = '<path d="M24 48 H76 Q74 74 50 74 Q26 74 24 48 Z" fill="#3E1850"/><ellipse cx="50" cy="48" rx="26" ry="6" fill="#5E2878"/><circle cx="40" cy="44" r="4" fill="#F5D45A"/><circle cx="54" cy="42" r="4" fill="#C8302A"/><path d="M60 44 q4 -6 8 0" stroke="#F4ECE6" stroke-width="3" fill="none"/>'; break;
    case 'split': s = '<path d="M22 56 Q50 82 78 56 Z" fill="#E9DFD3"/><circle cx="36" cy="46" r="10" fill="#F7D1D9"/><circle cx="50" cy="44" r="10" fill="#F7E7C2"/><circle cx="64" cy="46" r="10" fill="#7A4A32"/><path d="M30 58 q20 -16 40 0" fill="none" stroke="#F5D45A" stroke-width="6"/><circle cx="50" cy="32" r="4" fill="#C8302A"/>'; break;
    case 'garlic': s = '<ellipse cx="42" cy="46" rx="22" ry="10" transform="rotate(-18 42 46)" fill="#E8B263"/><ellipse cx="58" cy="60" rx="22" ry="10" transform="rotate(-18 58 60)" fill="#E8B263"/><g fill="#3F9A45"><circle cx="34" cy="46" r="1.6"/><circle cx="46" cy="42" r="1.6"/><circle cx="52" cy="62" r="1.6"/><circle cx="64" cy="56" r="1.6"/></g>'; break;
    case 'bruschetta': s = '<rect x="24" y="42" width="24" height="16" rx="4" fill="#E8B263"/><rect x="52" y="42" width="24" height="16" rx="4" fill="#E8B263"/><rect x="38" y="60" width="24" height="16" rx="4" fill="#E8B263"/><g fill="#D8402E"><circle cx="32" cy="48" r="3.4"/><circle cx="60" cy="48" r="3.4"/><circle cx="46" cy="66" r="3.4"/></g><g fill="#2F7D3F"><ellipse cx="40" cy="52" rx="3" ry="1.6"/><ellipse cx="68" cy="52" rx="3" ry="1.6"/><ellipse cx="54" cy="70" rx="3" ry="1.6"/></g>'; break;
    case 'fries': s = '<g fill="#F0C85A"><rect x="32" y="26" width="5" height="34" rx="2" transform="rotate(-10 34 40)"/><rect x="40" y="24" width="5" height="36" rx="2"/><rect x="48" y="26" width="5" height="34" rx="2" transform="rotate(6 50 40)"/><rect x="56" y="24" width="5" height="36" rx="2" transform="rotate(14 58 40)"/><rect x="64" y="28" width="5" height="32" rx="2" transform="rotate(22 66 42)"/></g><path d="M28 54 H72 L67 78 H33 Z" fill="#CF3A2A"/><rect x="28" y="54" width="44" height="5" fill="#9E241A"/>'; break;
    case 'onion': s = '<circle cx="38" cy="50" r="12" fill="none" stroke="#D79A4B" stroke-width="6"/><circle cx="62" cy="50" r="12" fill="none" stroke="#E0A85C" stroke-width="6"/><circle cx="50" cy="66" r="12" fill="none" stroke="#D79A4B" stroke-width="6"/>'; break;
    case 'bolinho': s = '<circle cx="38" cy="50" r="11" fill="#D79A4B"/><circle cx="62" cy="50" r="11" fill="#D79A4B"/><circle cx="50" cy="66" r="11" fill="#D79A4B"/><circle cx="35" cy="46" r="3" fill="#EBC080" opacity=".7"/><circle cx="59" cy="46" r="3" fill="#EBC080" opacity=".7"/><circle cx="47" cy="62" r="3" fill="#EBC080" opacity=".7"/>'; break;
    case 'isca': s = '<rect x="26" y="44" width="30" height="12" rx="6" transform="rotate(-20 41 50)" fill="#D79A4B"/><rect x="40" y="58" width="32" height="12" rx="6" transform="rotate(12 56 64)" fill="#E0A85C"/><rect x="48" y="36" width="26" height="12" rx="6" transform="rotate(30 61 42)" fill="#D79A4B"/>'; break;
    case 'pastel': s = '<path d="M24 64 Q24 36 50 36 Q76 36 76 64 Z" fill="#E0A85C" stroke="#A8692B" stroke-width="2"/><path d="M28 64 H72" stroke="#A8692B" stroke-width="3" stroke-dasharray="3 3"/><circle cx="42" cy="50" r="2" fill="#F3D08A"/><circle cx="56" cy="46" r="2" fill="#F3D08A"/>'; break;
    case 'salad': s = '<path d="M22 54 H78 Q76 76 50 76 Q24 76 22 54 Z" fill="#E9DFD3"/><g fill="#3F9A45"><ellipse cx="34" cy="50" rx="10" ry="5" transform="rotate(-20 34 50)"/><ellipse cx="50" cy="46" rx="10" ry="5"/><ellipse cx="66" cy="50" rx="10" ry="5" transform="rotate(20 66 50)"/></g><rect x="40" y="44" width="7" height="7" rx="1" fill="#E8B263"/><rect x="56" y="46" width="7" height="7" rx="1" fill="#E8B263"/><path d="M50 36 l4 4 l-4 4 l-4 -4 Z" fill="#F4E8C2"/>'; break;
    case 'provolone': s = '<rect x="28" y="40" width="44" height="14" rx="3" fill="#F2C94C" stroke="#B88A1A" stroke-width="1.5"/><rect x="32" y="56" width="36" height="12" rx="3" fill="#E8B83A"/><circle cx="40" cy="47" r="2" fill="#B88A1A"/><circle cx="58" cy="46" r="1.6" fill="#B88A1A"/>'; break;
    case 'camarao': s = '<path d="M30 62 Q28 40 48 38 Q66 38 70 52 Q60 46 52 50 Q44 56 38 66 Z" fill="#E0A85C" stroke="#A8692B" stroke-width="2"/><path d="M68 50 q8 4 4 12" stroke="#C8302A" stroke-width="4" fill="none" stroke-linecap="round"/>'; break;
    case 'drink': s = '<path d="M28 28 H56 L52 74 H32 Z" fill="#3B2314"/><path d="M28 28 H56" stroke="#D9CFC6" stroke-width="3"/><circle cx="41" cy="36" r="3" fill="#FFFFFF" opacity=".6"/><rect x="62" y="40" width="14" height="32" rx="3" fill="#CF3A2A"/><rect x="62" y="50" width="14" height="6" fill="#F7F2EF"/>'; break;
    case 'c1': s = '<circle cx="40" cy="54" r="22" fill="#E8B263"/><circle cx="40" cy="54" r="18" fill="#F6D67B"/><circle cx="34" cy="50" r="3.4" fill="#B3261E"/><circle cx="46" cy="58" r="3.4" fill="#B3261E"/><rect x="66" y="40" width="14" height="28" rx="3" fill="#CF3A2A"/><rect x="66" y="48" width="14" height="6" fill="#F7F2EF"/>'; break;
    case 'c2': s = '<circle cx="38" cy="50" r="22" fill="#E8B263"/><circle cx="38" cy="50" r="18" fill="#F6D67B"/><circle cx="32" cy="46" r="3.4" fill="#B3261E"/><circle cx="44" cy="54" r="3.4" fill="#B3261E"/><circle cx="46" cy="72" r="11" fill="#5A2E1D"/><rect x="68" y="30" width="12" height="42" rx="4" fill="#CF3A2A"/><rect x="71" y="24" width="6" height="8" fill="#241915"/>'; break;
    case 'c3': s = '<circle cx="34" cy="46" r="20" fill="#E8B263"/><circle cx="34" cy="46" r="16" fill="#F6D67B"/><circle cx="30" cy="42" r="3" fill="#B3261E"/><circle cx="40" cy="50" r="3" fill="#2F7D3F"/><circle cx="50" cy="66" r="20" fill="#E8B263"/><circle cx="50" cy="66" r="16" fill="#F6D67B"/><circle cx="46" cy="62" r="3" fill="#B3261E"/><circle cx="56" cy="70" r="3" fill="#D79A4B"/><rect x="70" y="26" width="12" height="46" rx="4" fill="#CF3A2A"/><rect x="73" y="20" width="6" height="8" fill="#241915"/>'; break;
    case 'c4': s = '<circle cx="36" cy="50" r="26" fill="#E8B263"/><circle cx="36" cy="50" r="22" fill="#F6D67B"/><circle cx="28" cy="44" r="3.4" fill="#B3261E"/><circle cx="42" cy="56" r="3.4" fill="#B3261E"/><circle cx="40" cy="40" r="3.4" fill="#2F7D3F"/><circle cx="58" cy="72" r="11" fill="#5A2E1D"/><rect x="70" y="24" width="14" height="46" rx="4" fill="#CF3A2A"/><rect x="74" y="18" width="6" height="8" fill="#241915"/>'; break;
  }
  FLAT.forEach(function (f) { s = s.split('fill="' + f[0] + '"').join('fill="' + f[1] + '"'); });
  var plate = /^c\d$/.test(kind) ? '' : PLATE;
  return '<svg viewBox="0 0 100 100" role="img" aria-label="' + esc(label) + '">' + BOARD + plate + '<g filter="url(#fTop)">' + s + '</g>' + LIGHT + '</svg>';
}
function itemArt(it) { return it.top ? pizzaArt(it.top, it.id, it.name) : art(it.art, it.name); }


/* ---------- fotos (as mesmas do cardapio da equipe) ---------- */
var PHOTOS = {
  "Calabresa": "https://www.sabornamesa.com.br/media/k2/items/cache/513d7a0ab11e38f7bd117d760146fed3_XL.jpg",
  "Mussarela": "https://i.pinimg.com/736x/9e/f3/32/9ef332b3cb6c5efa6a2643af93aa6df2.jpg",
  "Marguerita": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
  "Napolitana": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  "Pepperoni": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=80",
  "Brasileira": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80",
  "Portuguesa": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80",
  "Country": "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=400&q=80",
  "Supreme": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80",
  "Pudim": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
  "Brownie": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
  "Sorvete": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80",
  "Torta Limão": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80",
  "Mousse Choc.": "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=400&q=80",
  "Cheesecake": "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=400&q=80",
  "Petit Gateau": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
  "Açaí": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=400&q=80",
  "Banana Split": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80",
  "Combo Família": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  "Combo Casal": "https://plus.unsplash.com/premium_photo-1674662515879-66291ed854eb?auto=format&fit=crop&w=800&q=80&ixlib=rb-4.1.0",
  "Combo Individual": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80",
  "Combo Kids": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  "Combo Executivo": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=80",
  "Combo Festa": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80",
  "Combo Light": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=400&q=80",
  "Combo Premium": "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=400&q=80",
  "Combo Surpresa": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80",
  "Batata Frita": "https://msabores.com/wp-content/uploads/2025/09/Batata-Frita-com-Paprica.webp",
  "Onion Rings": "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=400&q=80",
  "Bolinho de Bacalhau": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80",
  "Bruschetta": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=400&q=80",
  "Isca de Frango": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=400&q=80",
  "Pastel": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80",
  "Salada Caesar": "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=400&q=80",
  "Provolone": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80",
  "Camarão Empanado": "https://plus.unsplash.com/premium_photo-1667115593089-17f5b6116217?auto=format&fit=crop&w=800&q=80&ixlib=rb-4.1.0"
};
ITEMS.forEach(function (it) { if (PHOTOS[it.name]) it.photo = PHOTOS[it.name]; });

/* ---------- definicoes de gradiente e sombra usadas pelas ilustracoes ---------- */
var SVG_DEFS = "<svg class=\"svgdefs\" aria-hidden=\"true\" focusable=\"false\"><defs>\n  <radialGradient id=\"gBoard\" cx=\"40%\" cy=\"35%\" r=\"75%\"><stop offset=\"0\" stop-color=\"#7C5334\"/><stop offset=\".6\" stop-color=\"#5A3921\"/><stop offset=\"1\" stop-color=\"#3A2413\"/></radialGradient>\n  <radialGradient id=\"gCrust\" cx=\"40%\" cy=\"35%\" r=\"75%\"><stop offset=\"0\" stop-color=\"#F1C97A\"/><stop offset=\".7\" stop-color=\"#D79B47\"/><stop offset=\"1\" stop-color=\"#A56924\"/></radialGradient>\n  <radialGradient id=\"gSauce\" cx=\"50%\" cy=\"50%\" r=\"50%\"><stop offset=\"0\" stop-color=\"#C23A26\"/><stop offset=\"1\" stop-color=\"#8A2214\"/></radialGradient>\n  <radialGradient id=\"gCheese\" cx=\"42%\" cy=\"38%\" r=\"70%\"><stop offset=\"0\" stop-color=\"#FFEAAE\"/><stop offset=\".65\" stop-color=\"#F4CD6E\"/><stop offset=\"1\" stop-color=\"#DBA03C\"/></radialGradient>\n  <radialGradient id=\"gPep\" cx=\"38%\" cy=\"32%\" r=\"75%\"><stop offset=\"0\" stop-color=\"#E4583E\"/><stop offset=\".6\" stop-color=\"#B3281B\"/><stop offset=\"1\" stop-color=\"#7A160F\"/></radialGradient>\n  <radialGradient id=\"gCal\" cx=\"38%\" cy=\"32%\" r=\"75%\"><stop offset=\"0\" stop-color=\"#E9997C\"/><stop offset=\".7\" stop-color=\"#C46A4A\"/><stop offset=\"1\" stop-color=\"#8C3E26\"/></radialGradient>\n  <radialGradient id=\"gTom\" cx=\"40%\" cy=\"35%\" r=\"75%\"><stop offset=\"0\" stop-color=\"#F2735C\"/><stop offset=\"1\" stop-color=\"#B52F1E\"/></radialGradient>\n  <linearGradient id=\"gLeaf\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#54A55C\"/><stop offset=\"1\" stop-color=\"#235C2F\"/></linearGradient>\n  <radialGradient id=\"gGold\" cx=\"40%\" cy=\"35%\" r=\"80%\"><stop offset=\"0\" stop-color=\"#EDBA68\"/><stop offset=\"1\" stop-color=\"#B8762E\"/></radialGradient>\n  <radialGradient id=\"gChoc\" cx=\"40%\" cy=\"35%\" r=\"80%\"><stop offset=\"0\" stop-color=\"#7C4629\"/><stop offset=\"1\" stop-color=\"#3A1C0F\"/></radialGradient>\n  <radialGradient id=\"gCream\" cx=\"40%\" cy=\"35%\" r=\"80%\"><stop offset=\"0\" stop-color=\"#FFF7E2\"/><stop offset=\"1\" stop-color=\"#E7D1A0\"/></radialGradient>\n  <radialGradient id=\"gPlate\" cx=\"40%\" cy=\"35%\" r=\"80%\"><stop offset=\"0\" stop-color=\"#FFFFFF\"/><stop offset=\"1\" stop-color=\"#D5CEC6\"/></radialGradient>\n  <radialGradient id=\"gLight\" cx=\"30%\" cy=\"25%\" r=\"80%\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".26\"/><stop offset=\".5\" stop-color=\"#fff\" stop-opacity=\"0\"/><stop offset=\"1\" stop-color=\"#000\" stop-opacity=\".3\"/></radialGradient>\n  <filter id=\"fShadow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"150%\"><feDropShadow dx=\"0\" dy=\"2.4\" stdDeviation=\"2.2\" flood-color=\"#000\" flood-opacity=\".6\"/></filter>\n  <filter id=\"fTop\" x=\"-30%\" y=\"-30%\" width=\"160%\" height=\"170%\"><feDropShadow dx=\".4\" dy=\".8\" stdDeviation=\".55\" flood-color=\"#000\" flood-opacity=\".5\"/></filter>\n</defs></svg>";

/* ---------- pecas de HTML reaproveitadas ---------- */
function normalizar(s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
function acharPrato(texto) {
  var t = normalizar(texto || '');
  for (var i = 0; i < ITEMS.length; i++) { if (normalizar(ITEMS[i].name) === t || ITEMS[i].id === t) return ITEMS[i]; }
  return null;
}
function urlPrato(it, base) { return (base || '../Pratos/pratos.html') + '?sabor=' + encodeURIComponent(it.name); }
function mediaHTML(it) {
  return '<span class="media" data-art="' + it.id + '">' + (it.photo ? '<img src="' + it.photo + '" alt="' + esc(it.name) + '" loading="lazy" onerror="this.remove()">' : '') + '</span>';
}
function aPartirDe(it) { return it.prices ? '<small>a partir de</small>' + brl(it.prices[0]) : brl(it.price); }
function cardHTML(it, base) {
  var tags = it.tags && it.tags.length ? '<div class="tags">' + it.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' : '';
  return '<article class="card">' +
    '<a class="card-art" href="' + urlPrato(it, base) + '" aria-label="Ver detalhes de ' + esc(it.name) + '">' + mediaHTML(it) + '</a>' +
    '<div class="card-body"><h3>' + esc(it.name) + '</h3>' + tags + '<p class="desc">' + esc(it.desc) + '</p>' +
    '<div class="card-foot"><span class="price">' + aPartirDe(it) + '</span><a class="btn small" href="' + urlPrato(it, base) + '">Detalhes</a></div></div></article>';
}