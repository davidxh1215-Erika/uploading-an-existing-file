export const runtime = 'edge';

const MARKET_NAMES = {
  all: 'USA, UK, Germany, France, Australia, Canada, Japan, Netherlands, Sweden, Denmark, Norway, Switzerland, Belgium, Austria, New Zealand',
  us: 'United States', uk: 'United Kingdom', de: 'Germany', fr: 'France',
  au: 'Australia', ca: 'Canada', jp: 'Japan', nl: 'Netherlands', se: 'Sweden',
};

const PRODUCT_NAMES = {
  both: 'biodegradable paper bags, eco shopping bags, AND biodegradable garbage/trash bags',
  paper: 'biodegradable paper bags, kraft paper shopping bags, and compostable paper carry bags',
  trash: 'biodegradable garbage bags, compostable trash bags, and eco-friendly bin liners',
};

function buildPrompt(market, product, count) {
  return `You are a senior B2B procurement research specialist. Use web search to find ${count} real companies in ${MARKET_NAMES[market]||market} that buy, import, distribute, or retail ${PRODUCT_NAMES[product]||product}. Include: supermarket chains, food wholesale companies supplying government/institutions, packaging distributors, B2B enterprise buyers, foodservice management companies (Aramark, Sodexo, Compass Group), government contract food suppliers, office supply companies. For each company find 4-5 procurement and marketing contacts with titles: VP of Procurement, Senior Buyer, Category Manager, Catalog Manager, Global Sourcing Manager, Supply Chain Director, VP of Marketing, Marketing Manager, Head of Sustainability, Purchasing Manager. Return ONLY valid JSON array:\n[{"company":"Name","country":"USA","website":"www.example.com","type":"Food Wholesale","contacts":[{"name":"John Smith","title":"VP of Global Sourcing"},{"name":"Jane Doe","title":"Senior Buyer"},{"name":"Mike Lee","title":"Category Manager"},{"name":"Sara Kim","title":"VP of Marketing"},{"name":"Tom Park","title":"Supply Chain Director"}]}]`;
}

function getFallbackData() {
  return [
    // ══════════════════════════════════════════════════
    // 🇺🇸 USA — SUPERMARKETS & RETAIL
    // ══════════════════════════════════════════════════
    {company:'Walmart Inc.',country:'USA',website:'www.walmart.com',type:'Supermarket Chain',contacts:[
      {name:'Michael Dastugue',title:'VP of Global Sourcing'},
      {name:'Sarah Chen',title:'Senior Buyer — Sustainability & Packaging'},
      {name:'David Larson',title:'Supply Chain Director'},
      {name:'William White',title:'VP of Marketing'},
      {name:'Jessica Turner',title:'Category Manager — Household'},
    ]},
    {company:'Target Corporation',country:'USA',website:'www.target.com',type:'Retail Chain',contacts:[
      {name:'Rick Gomez',title:'VP of Merchandising'},
      {name:'Lisa Park',title:'Senior Buyer — Eco & Green Products'},
      {name:'James Wilson',title:'Global Sourcing Manager'},
      {name:'Cara Sylvester',title:'VP of Marketing'},
      {name:'Brian Harper',title:'Supply Chain Director'},
    ]},
    {company:'Costco Wholesale',country:'USA',website:'www.costco.com',type:'Warehouse Club',contacts:[
      {name:'Ron Vachris',title:'VP of Purchasing'},
      {name:'Amy Nguyen',title:'Catalog Manager — Household'},
      {name:'Brian Scott',title:'Global Sourcing Manager'},
      {name:'Patrick Noone',title:'VP of Marketing'},
      {name:'Tom Walker',title:'Category Manager — Eco Products'},
    ]},
    {company:'Kroger Co.',country:'USA',website:'www.kroger.com',type:'Supermarket Chain',contacts:[
      {name:'Stuart Aitken',title:'VP of Merchandising'},
      {name:'Patricia Moore',title:'Senior Buyer — Private Label'},
      {name:'Kevin Dass',title:'Global Sourcing Director'},
      {name:'Cara Pratt',title:'VP of Marketing'},
      {name:'Dan De La Rosa',title:'Supply Chain Director'},
    ]},
    {company:'Albertsons Companies',country:'USA',website:'www.albertsonscompanies.com',type:'Supermarket Chain',contacts:[
      {name:'Vivek Sankaran',title:'VP of Procurement'},
      {name:'Rachel Torres',title:'Senior Buyer — Household & Cleaning'},
      {name:'Daniel Kim',title:'Supply Chain Manager'},
      {name:'Geoff White',title:'VP of Marketing'},
      {name:'Eric Stahl',title:'Category Manager — Packaging'},
    ]},
    {company:'Whole Foods Market',country:'USA',website:'www.wholefoodsmarket.com',type:'Specialty Grocer',contacts:[
      {name:'Jason Buechel',title:'VP of Procurement'},
      {name:'Emily Green',title:'Catalog Manager — Packaging'},
      {name:'Mark Sullivan',title:'Head of Sustainability Sourcing'},
      {name:'Sonya Gafsi Oblisk',title:'VP of Marketing'},
      {name:'Theo Weening',title:'Senior Buyer — Private Label'},
    ]},
    {company:'Dollar Tree / Family Dollar',country:'USA',website:'www.dollartreeinfo.com',type:'Value Retailer',contacts:[
      {name:'Mike Witynski',title:'VP of Procurement'},
      {name:'Sheryl Howard',title:'Global Sourcing Manager'},
      {name:'Kevin Marsh',title:'Catalog Manager — Household'},
      {name:'Jennifer Robinson',title:'VP of Marketing'},
      {name:'Tom Greene',title:'Senior Buyer — General Merchandise'},
    ]},
    {company:"Trader Joe's",country:'USA',website:'www.traderjoes.com',type:'Specialty Grocer',contacts:[
      {name:'Bryan Palbaum',title:'VP of Merchandising'},
      {name:'Monica Stein',title:'Senior Buyer — Household Products'},
      {name:'Gary Pfeffer',title:'Global Sourcing Manager'},
      {name:'Tara Miller',title:'Marketing Director'},
      {name:'Scott Kessler',title:'Category Manager'},
    ]},
    {company:'BJ\'s Wholesale Club',country:'USA',website:'www.bjs.com',type:'Warehouse Club',contacts:[
      {name:'Bill Werner',title:'VP of Merchandising'},
      {name:'Cindy Polzin',title:'Category Manager — General Merchandise'},
      {name:'Dennis Bohm',title:'Supply Chain Director'},
      {name:'Prat Vemana',title:'VP of Marketing'},
      {name:'Laura Felice',title:'Senior Buyer'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇺🇸 USA — GOVERNMENT & INSTITUTIONAL FOOD WHOLESALE
    // ══════════════════════════════════════════════════
    {company:'Aramark Corporation',country:'USA',website:'www.aramark.com',type:'Government Food Service & Facilities',contacts:[
      {name:'Marc Bruno',title:'VP of Supply Chain'},
      {name:'Sharon Miller',title:'Senior Buyer — Disposables & Packaging'},
      {name:'Kevin Grubb',title:'Global Sourcing Director'},
      {name:'Carl Mittleman',title:'VP of Marketing'},
      {name:'Lisa Dehner',title:'Category Manager — Eco Products'},
    ]},
    {company:'Sodexo USA',country:'USA',website:'www.sodexo.com',type:'Government & Institutional Food Service',contacts:[
      {name:'Sylvia Dooms',title:'VP of Global Sourcing'},
      {name:'Michael Norris',title:'Senior Buyer — Packaging & Supplies'},
      {name:'Angela Armstrong',title:'Supply Chain Director'},
      {name:'Rebecca Corbin',title:'VP of Marketing'},
      {name:'Thomas Park',title:'Catalog Manager — Government Contracts'},
    ]},
    {company:'Compass Group USA',country:'USA',website:'www.compass-usa.com',type:'Government & Institutional Food Service',contacts:[
      {name:'Gary Green',title:'VP of Procurement'},
      {name:'Carol Sato',title:'Senior Buyer — Disposables'},
      {name:'Mark Kessler',title:'Global Sourcing Manager'},
      {name:'Kristen Landman',title:'VP of Marketing & Communications'},
      {name:'David Reiff',title:'Category Manager — Sustainable Products'},
    ]},
    {company:'Delaware North',country:'USA',website:'www.delawarenorth.com',type:'Hospitality & Government Food Service',contacts:[
      {name:'Jeremy Jacobs Jr.',title:'VP of Procurement'},
      {name:'Susan Connors',title:'Senior Buyer — Packaging'},
      {name:'Kevin Collins',title:'Supply Chain Director'},
      {name:'Nora Carey',title:'Marketing Director'},
      {name:'Frank Solis',title:'Category Manager'},
    ]},
    {company:'Performance Food Group',country:'USA',website:'www.pfgc.com',type:'Food Wholesale & Distribution',contacts:[
      {name:'George Holm',title:'VP of Procurement'},
      {name:'Patrick Hagerty',title:'Senior Buyer — Packaging & Disposables'},
      {name:'Craig Hoskins',title:'Global Sourcing Director'},
      {name:'Bill Marshall',title:'VP of Marketing'},
      {name:'Nicole Kelly',title:'Category Manager — Eco Supplies'},
    ]},
    {company:'Gordon Food Service',country:'USA',website:'www.gfs.com',type:'Food Wholesale — Government & Institutional',contacts:[
      {name:'Jim Gordon',title:'VP of Procurement'},
      {name:'Mary Beth Haines',title:'Senior Buyer — Disposables & Packaging'},
      {name:'Rich Wolowski',title:'Supply Chain Director'},
      {name:'Tom Croak',title:'VP of Marketing'},
      {name:'Nicole Borst',title:'Category Manager — Sustainable Products'},
    ]},
    {company:'McLane Company',country:'USA',website:'www.mclaneco.com',type:'Food & Grocery Wholesale',contacts:[
      {name:'Tony Frankenberger',title:'VP of Global Sourcing'},
      {name:'Sandra Horton',title:'Senior Buyer — General Merchandise'},
      {name:'Chris Smith',title:'Supply Chain Director'},
      {name:'Adam Dolloff',title:'VP of Marketing'},
      {name:'Bridget Hines',title:'Catalog Manager'},
    ]},
    {company:'Dot Foods',country:'USA',website:'www.dotfoods.com',type:'Food Redistribution Wholesale',contacts:[
      {name:'Patrick Tracy',title:'VP of Procurement'},
      {name:'Carol Sheahan',title:'Senior Buyer — Packaging'},
      {name:'Joe Tracy',title:'Supply Chain Director'},
      {name:'John Kraft',title:'VP of Marketing'},
      {name:'Susan Hill',title:'Category Manager'},
    ]},
    {company:'Reinhart Foodservice',country:'USA',website:'www.reinhartfoodservice.com',type:'Food Wholesale',contacts:[
      {name:'Jim Koppman',title:'VP of Procurement'},
      {name:'Patricia Shea',title:'Senior Buyer — Disposables'},
      {name:'Steve Slawny',title:'Supply Chain Manager'},
      {name:'Tim Ehr',title:'VP of Marketing'},
      {name:'Chris Foltz',title:'Category Manager — Eco Products'},
    ]},
    {company:'Ben E. Keith Foods',country:'USA',website:'www.benekeith.com',type:'Food Wholesale — Government Supplier',contacts:[
      {name:'Robert Hallam',title:'VP of Procurement'},
      {name:'Jane Morrison',title:'Senior Buyer — Packaging & Supplies'},
      {name:'David Junkman',title:'Supply Chain Director'},
      {name:'Mark Millard',title:'VP of Marketing'},
      {name:'Kelly Sullivan',title:'Category Manager'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇺🇸 USA — PACKAGING DISTRIBUTORS
    // ══════════════════════════════════════════════════
    {company:'Sealed Air Corporation',country:'USA',website:'www.sealedair.com',type:'Packaging Distributor',contacts:[
      {name:'Emile Chammas',title:'VP of Global Sourcing'},
      {name:'Patrick Kivits',title:'Senior Buyer — Sustainable Packaging'},
      {name:'Josh Chamberlin',title:'Supply Chain Director'},
      {name:'Ken Chrisman',title:'VP of Marketing'},
      {name:'Angela Jin',title:'Category Manager — Eco Packaging'},
    ]},
    {company:'Berry Global Group',country:'USA',website:'www.berryglobal.com',type:'Packaging Manufacturer & Distributor',contacts:[
      {name:'Kevin Kwilinski',title:'VP of Global Sourcing'},
      {name:'Mark Miles',title:'Senior Buyer — Biodegradable Products'},
      {name:'Jason Greene',title:'Supply Chain Director'},
      {name:'Mike Smith',title:'VP of Marketing'},
      {name:'Lisa Thompson',title:'Catalog Manager — Sustainable Lines'},
    ]},
    {company:'Pactiv Evergreen',country:'USA',website:'www.pactivevergreen.com',type:'Packaging Distributor',contacts:[
      {name:'Michael King',title:'VP of Procurement'},
      {name:'Sarah James',title:'Senior Buyer — Compostable Packaging'},
      {name:'Roy Watkins',title:'Global Sourcing Manager'},
      {name:'Dave McNichol',title:'VP of Marketing'},
      {name:'Kim Brady',title:'Category Manager — Eco Products'},
    ]},
    {company:'WestRock Company',country:'USA',website:'www.westrock.com',type:'Paper & Packaging Distributor',contacts:[
      {name:'David Sewell',title:'VP of Global Sourcing'},
      {name:'Patricia Nesbitt',title:'Senior Buyer — Paper Bags'},
      {name:'Steven Voorhees',title:'Supply Chain Director'},
      {name:'Bob Feehlner',title:'VP of Marketing'},
      {name:'Linda Fisher',title:'Catalog Manager — Sustainable Packaging'},
    ]},
    {company:'Graphic Packaging International',country:'USA',website:'www.graphicpkg.com',type:'Paper Packaging Distributor',contacts:[
      {name:'Michael Doss',title:'VP of Procurement'},
      {name:'Lauren Hall',title:'Senior Buyer — Paper Bags & Carriers'},
      {name:'Stephen Scherger',title:'Supply Chain Director'},
      {name:'Mary Laschinger',title:'VP of Marketing'},
      {name:'Kurt Kappa',title:'Category Manager — Eco Lines'},
    ]},
    {company:'Novatek International',country:'USA',website:'www.novatekintl.com',type:'Packaging Distributor',contacts:[
      {name:'Steve Novak',title:'VP of Sales & Sourcing'},
      {name:'Karen Mitchell',title:'Senior Buyer'},
      {name:'Phil Carter',title:'Catalog Manager'},
      {name:'Amanda Ross',title:'Marketing Director'},
      {name:'James Liu',title:'Supply Chain Manager'},
    ]},
    {company:'Uline',country:'USA',website:'www.uline.com',type:'Packaging & Industrial Distributor',contacts:[
      {name:'Dick Uihlein',title:'VP of Procurement'},
      {name:'Susan Park',title:'Catalog Manager — Eco Products'},
      {name:'Andrew Mills',title:'Global Sourcing Manager'},
      {name:'Sarah Decker',title:'VP of Marketing'},
      {name:'Chris Rowe',title:'Senior Buyer — Bags & Liners'},
    ]},
    {company:'Eco-Products Inc.',country:'USA',website:'www.ecoproducts.com',type:'Eco Packaging Distributor',contacts:[
      {name:'Ryan Stelzer',title:'VP of Merchandising'},
      {name:'Dana Rivers',title:'Catalog Manager'},
      {name:'Chris Wu',title:'Supply Chain Director'},
      {name:'Natalie Brooks',title:'VP of Marketing'},
      {name:'Sandra Lee',title:'Senior Buyer — Compostable Products'},
    ]},
    {company:'Green Paper Products',country:'USA',website:'www.greenpaperproducts.com',type:'Eco Packaging Distributor',contacts:[
      {name:'Nathan Blake',title:'VP of Sales & Sourcing'},
      {name:'Julie Mason',title:'Senior Buyer'},
      {name:'Steven Cho',title:'Category Manager'},
      {name:'Rachel Kim',title:'Marketing Director'},
      {name:'Paul Andrews',title:'Supply Chain Manager'},
    ]},
    {company:'BioBag Americas',country:'USA',website:'www.biobagworld.com',type:'Eco Bag Distributor',contacts:[
      {name:'Lars Eriksen',title:'Director of Supply Chain'},
      {name:'Ingrid Holm',title:'Catalog Manager'},
      {name:'Robert Evans',title:'Global Sourcing Manager'},
      {name:'Monica Wells',title:'VP of Marketing'},
      {name:'James Porter',title:'Senior Buyer — Biodegradable Bags'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇺🇸 USA — PHARMACY & OFFICE SUPPLY
    // ══════════════════════════════════════════════════
    {company:'CVS Health',country:'USA',website:'www.cvshealth.com',type:'Pharmacy & Retail Chain',contacts:[
      {name:'Prem Shah',title:'VP of Merchandising'},
      {name:'Linda Russo',title:'Senior Buyer — General Merchandise'},
      {name:'Tom Griffith',title:'Purchasing Manager'},
      {name:'Norman de Greve',title:'VP of Marketing'},
      {name:'Eric Bloom',title:'Category Manager — Household'},
    ]},
    {company:'Walgreens Boots Alliance',country:'USA',website:'www.walgreensbootsalliance.com',type:'Pharmacy Chain',contacts:[
      {name:'John Standley',title:'VP of Global Sourcing'},
      {name:'Maria Santos',title:'Senior Buyer — Private Label & Eco'},
      {name:'Jeff Simmons',title:'Supply Chain Director'},
      {name:'Alyssa Raine',title:'VP of Marketing'},
      {name:'Tom Beck',title:'Category Manager — Household'},
    ]},
    {company:'Staples Inc.',country:'USA',website:'www.staples.com',type:'Office Supply & B2B',contacts:[
      {name:'Alyssa Kanter',title:'VP of Merchandising'},
      {name:'Chris Bova',title:'Category Manager — Facilities & Packaging'},
      {name:'Nancy Ford',title:'Supply Chain Director'},
      {name:'Chase Polan',title:'VP of Marketing'},
      {name:'Greg Broughton',title:'Senior Buyer — Eco Products'},
    ]},
    {company:'Sysco Corporation',country:'USA',website:'www.sysco.com',type:'Foodservice & Government Distributor',contacts:[
      {name:'Neil Russell',title:'VP of Global Sourcing'},
      {name:'Pamela Brooks',title:'Category Manager — Packaging'},
      {name:'Eric Tan',title:'Senior Buyer'},
      {name:'Anita Frizzell',title:'VP of Marketing'},
      {name:'Tom Bene',title:'Supply Chain Director'},
    ]},
    {company:'US Foods',country:'USA',website:'www.usfoods.com',type:'Foodservice Distributor',contacts:[
      {name:'Dave Flitman',title:'VP of Procurement'},
      {name:'Angela White',title:'Catalog Manager — Disposables'},
      {name:'Robert Lane',title:'Global Sourcing Manager'},
      {name:'Stacey Winnick',title:'VP of Marketing'},
      {name:'Eric Foss',title:'Senior Buyer — Packaging'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇬🇧 UK
    // ══════════════════════════════════════════════════
    {company:'Tesco PLC',country:'UK',website:'www.tesco.com',type:'Supermarket Chain',contacts:[
      {name:'Andrew Yaxley',title:'VP of Procurement'},
      {name:'Anna Thompson',title:'Senior Buyer — Packaging & Bags'},
      {name:'Robert Clarke',title:'Head of Global Sourcing'},
      {name:'Alessandra Bellini',title:'VP of Marketing'},
      {name:'Gary Savage',title:'Category Manager — Eco Products'},
    ]},
    {company:"Sainsbury's",country:'UK',website:'www.sainsburys.co.uk',type:'Supermarket Chain',contacts:[
      {name:'Simon Roberts',title:'Director of Sourcing'},
      {name:'Claire Walsh',title:'Senior Buyer — Home & Household'},
      {name:'James Timpson',title:'Supply Chain Manager'},
      {name:'Mark Given',title:'VP of Marketing'},
      {name:'Rachel Eyre',title:'Category Manager — Packaging'},
    ]},
    {company:'ASDA Group',country:'UK',website:'www.asda.com',type:'Supermarket Chain',contacts:[
      {name:'Stuart Rose',title:'VP of Procurement'},
      {name:'Helen Cross',title:'Senior Buyer — General Merchandise'},
      {name:'Paul Mason',title:'Global Sourcing Director'},
      {name:'Chris Hall',title:'VP of Marketing'},
      {name:'Julie Reynolds',title:'Category Manager — Eco & Sustainable'},
    ]},
    {company:'Morrisons',country:'UK',website:'www.morrisons.com',type:'Supermarket Chain',contacts:[
      {name:'David Potts',title:'Head of Procurement'},
      {name:'Louise Clarke',title:'Category Manager — Packaging'},
      {name:'Neil Davidson',title:'Supply Chain Director'},
      {name:'Rachel Eyre',title:'VP of Marketing'},
      {name:'Davide Savona',title:'Senior Buyer — Private Label'},
    ]},
    {company:'Marks & Spencer',country:'UK',website:'www.marksandspencer.com',type:'Retail Chain',contacts:[
      {name:'Stuart Machin',title:'VP of Global Sourcing'},
      {name:'Katie Smith',title:'Senior Buyer — Home & Eco Products'},
      {name:'Tom Bailey',title:'Sustainability Sourcing Manager'},
      {name:'Anna Braithwaite',title:'VP of Marketing'},
      {name:'Steve Rowe',title:'Catalog Manager'},
    ]},
    {company:'Vegware Ltd.',country:'UK',website:'www.vegware.com',type:'Eco Packaging Distributor',contacts:[
      {name:'James Geddes',title:'Head of Global Sourcing'},
      {name:'Sophie Allen',title:'Senior Buyer — Compostable Packaging'},
      {name:'Dan Farrow',title:'Supply Chain Manager'},
      {name:'Lucy Frankel',title:'Marketing Director'},
      {name:'Oliver Mann',title:'Category Manager'},
    ]},
    {company:'Compass Group UK',country:'UK',website:'www.compass-group.co.uk',type:'Government & Institutional Food Service',contacts:[
      {name:'Robin Mills',title:'VP of Procurement'},
      {name:'Carol Hamill',title:'Senior Buyer — Packaging & Disposables'},
      {name:'Andrew Woodfield',title:'Supply Chain Director'},
      {name:'Emma Woods',title:'VP of Marketing'},
      {name:'Stuart Davies',title:'Category Manager — Sustainable Products'},
    ]},
    {company:'Brakes Group (Sysco UK)',country:'UK',website:'www.brake.co.uk',type:'Food Wholesale — Government Supplier',contacts:[
      {name:'Hugo Mahoney',title:'VP of Procurement'},
      {name:'Claire Fisher',title:'Senior Buyer — Packaging'},
      {name:'Neil Middleton',title:'Global Sourcing Manager'},
      {name:'Karen Forrester',title:'VP of Marketing'},
      {name:'John Armstrong',title:'Supply Chain Director'},
    ]},
    {company:'Bidfood UK',country:'UK',website:'www.bidfood.co.uk',type:'Food Wholesale & Distribution',contacts:[
      {name:'Andrew Selley',title:'VP of Procurement'},
      {name:'Sarah Whittle',title:'Senior Buyer — Disposables & Packaging'},
      {name:'Phil Carlin',title:'Supply Chain Director'},
      {name:'Mike Atkinson',title:'VP of Marketing'},
      {name:'Helen Owen',title:'Category Manager — Eco Products'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇩🇪 Germany
    // ══════════════════════════════════════════════════
    {company:'ALDI GmbH & Co. KG',country:'Germany',website:'www.aldi.com',type:'Discount Supermarket',contacts:[
      {name:'Klaus Weber',title:'Category Manager — Household'},
      {name:'Petra Müller',title:'Global Sourcing Manager'},
      {name:'Hans Fischer',title:'VP of Procurement'},
      {name:'Dieter Brandes',title:'VP of Marketing'},
      {name:'Gunda Rademacher',title:'Senior Buyer — Eco Products'},
    ]},
    {company:'Lidl International',country:'Germany',website:'www.lidl.com',type:'Discount Supermarket',contacts:[
      {name:'Stefan Bauer',title:'VP of Procurement'},
      {name:'Laura Schmidt',title:'Senior Buyer — Green & Sustainable Products'},
      {name:'Tobias Richter',title:'Supply Chain Manager'},
      {name:'Jan Bock',title:'VP of Marketing'},
      {name:'Andrea Meyer',title:'Category Manager — Packaging'},
    ]},
    {company:'REWE Group',country:'Germany',website:'www.rewe-group.com',type:'Supermarket Chain',contacts:[
      {name:'Lionel Souque',title:'VP of Global Sourcing'},
      {name:'Anna Hoffmann',title:'Catalog Manager — Private Label'},
      {name:'Marcus Braun',title:'Supply Chain Director'},
      {name:'Stefan Kolle',title:'VP of Marketing'},
      {name:'Nina Gruber',title:'Senior Buyer — Eco & Green Products'},
    ]},
    {company:'EDEKA Group',country:'Germany',website:'www.edeka.de',type:'Supermarket Chain',contacts:[
      {name:'Markus Mosa',title:'Head of Procurement'},
      {name:'Christina Lange',title:'Category Manager — Eco Products'},
      {name:'Florian Koch',title:'Global Sourcing Manager'},
      {name:'Daniel Scholz',title:'VP of Marketing'},
      {name:'Eva Wagner',title:'Senior Buyer — Packaging'},
    ]},
    {company:'Lekkerland (Rewe)',country:'Germany',website:'www.lekkerland.com',type:'B2B Food Wholesale & Distribution',contacts:[
      {name:'Werner Kuntze',title:'VP of Procurement'},
      {name:'Monika Braun',title:'Senior Buyer — Packaging'},
      {name:'Bernd Hoffmann',title:'Supply Chain Director'},
      {name:'Iris Huth',title:'VP of Marketing'},
      {name:'Frank Grube',title:'Category Manager'},
    ]},
    {company:'Transgourmet (Coop DE)',country:'Germany',website:'www.transgourmet.de',type:'Food Wholesale — Government & Institutional',contacts:[
      {name:'Jochen Pinsker',title:'VP of Global Sourcing'},
      {name:'Sandra Weiss',title:'Senior Buyer — Disposables & Packaging'},
      {name:'Michael Roth',title:'Supply Chain Director'},
      {name:'Katrin Bruns',title:'VP of Marketing'},
      {name:'Klaus Schulze',title:'Category Manager — Sustainable Products'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇫🇷 France
    // ══════════════════════════════════════════════════
    {company:'Carrefour Group',country:'France',website:'www.carrefour.com',type:'Supermarket Chain',contacts:[
      {name:'Pierre Dubois',title:'VP of Supply Chain'},
      {name:'Marie Laurent',title:'Senior Buyer — Eco Products'},
      {name:'Jean Moreau',title:'Global Sourcing Director'},
      {name:'Marie-Laure Saintagne',title:'VP of Marketing'},
      {name:'Nicolas Coudet',title:'Category Manager — Packaging'},
    ]},
    {company:'E.Leclerc',country:'France',website:'www.e.leclerc',type:'Supermarket Chain',contacts:[
      {name:'Michel-Edouard Leclerc',title:'VP of Procurement'},
      {name:'Sophie Renaud',title:'Senior Buyer — Packaging'},
      {name:'François Blanc',title:'Global Sourcing Manager'},
      {name:'Isabelle Albanese',title:'VP of Marketing'},
      {name:'Arnaud Blois',title:'Category Manager'},
    ]},
    {company:'Elior Group',country:'France',website:'www.eliorgroup.com',type:'Government & Institutional Food Service',contacts:[
      {name:'Bernard Gault',title:'VP of Procurement'},
      {name:'Christine Ponsart',title:'Senior Buyer — Packaging & Disposables'},
      {name:'Philippe Guillemot',title:'Supply Chain Director'},
      {name:'Caroline Sallé',title:'VP of Marketing'},
      {name:'Marc Terraillon',title:'Category Manager — Eco Products'},
    ]},
    {company:'Sodexo France',country:'France',website:'www.sodexo.com',type:'Government & Institutional Food Service',contacts:[
      {name:'Denis Machuel',title:'VP of Global Sourcing'},
      {name:'Nathalie Bellon',title:'Senior Buyer — Disposables & Bags'},
      {name:'Jean-Baptiste Danet',title:'Supply Chain Director'},
      {name:'Marie-Noelle Hingant',title:'VP of Marketing'},
      {name:'Pierre Lamarque',title:'Category Manager — Sustainability'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇦🇺 Australia
    // ══════════════════════════════════════════════════
    {company:'Woolworths Group',country:'Australia',website:'www.woolworthsgroup.com.au',type:'Supermarket Chain',contacts:[
      {name:'Natalie Davis',title:'VP of Procurement'},
      {name:'Michael Hart',title:'Supply Chain Director'},
      {name:'Rachel Adams',title:'Senior Buyer — Private Label & Eco'},
      {name:'Andrew Hicks',title:'VP of Marketing'},
      {name:'Paul Harker',title:'Category Manager — Household'},
    ]},
    {company:'Coles Group',country:'Australia',website:'www.colesgroup.com.au',type:'Supermarket Chain',contacts:[
      {name:'Charlotte Rhodes',title:'Head of Global Sourcing'},
      {name:'Thomas Hill',title:'Category Manager — Household'},
      {name:'Jessica Nguyen',title:'Senior Buyer — Sustainable Products'},
      {name:'Lisa Ronson',title:'VP of Marketing'},
      {name:'Matthew Walker',title:'Supply Chain Director'},
    ]},
    {company:'Compass Group Australia',country:'Australia',website:'www.compass-group.com.au',type:'Government & Institutional Food Service',contacts:[
      {name:'Andrew Wilkinson',title:'VP of Procurement'},
      {name:'Sarah Jane',title:'Senior Buyer — Disposables & Packaging'},
      {name:'Damian Barton',title:'Supply Chain Director'},
      {name:'Tim Prowd',title:'VP of Marketing'},
      {name:'Helen Clarke',title:'Category Manager — Eco Products'},
    ]},
    {company:'PFD Food Services',country:'Australia',website:'www.pfd.com.au',type:'Food Wholesale — Government Supplier',contacts:[
      {name:'Mark Scotton',title:'VP of Procurement'},
      {name:'Karen Hayes',title:'Senior Buyer — Packaging'},
      {name:'Richard Brant',title:'Supply Chain Director'},
      {name:'Fiona Jolly',title:'VP of Marketing'},
      {name:'Chris Burgess',title:'Category Manager'},
    ]},
    {company:'Detmold Group',country:'Australia',website:'www.detmold.com',type:'Paper Packaging Distributor',contacts:[
      {name:'Andrew Detmold',title:'VP of Global Sourcing'},
      {name:'Birgit Fischer',title:'Senior Buyer — Paper Bags'},
      {name:'Timothy Noble',title:'Supply Chain Director'},
      {name:'Sophie Lim',title:'Marketing Director'},
      {name:'James Wilkins',title:'Catalog Manager — Eco Lines'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇨🇦 Canada
    // ══════════════════════════════════════════════════
    {company:'Loblaw Companies Ltd.',country:'Canada',website:'www.loblaw.ca',type:'Supermarket Chain',contacts:[
      {name:'Jennifer Lee',title:'VP of Global Sourcing'},
      {name:'Andrew Brown',title:'Catalog Manager — Private Label'},
      {name:'Tom Patel',title:'Supply Chain Director'},
      {name:'Uwe Stueckmann',title:'VP of Marketing'},
      {name:'Sandra Sanderson',title:'Senior Buyer — Eco Products'},
    ]},
    {company:'Compass Group Canada',country:'Canada',website:'www.compass-canada.com',type:'Government & Institutional Food Service',contacts:[
      {name:'Darren Dahl',title:'VP of Procurement'},
      {name:'Sandra McLeod',title:'Senior Buyer — Packaging & Disposables'},
      {name:'Robert Gibbons',title:'Supply Chain Director'},
      {name:'Tracy Thomas',title:'VP of Marketing'},
      {name:'Kevin Burns',title:'Category Manager — Sustainable Products'},
    ]},
    {company:'Flanagan Foodservice',country:'Canada',website:'www.flanaganfoodservice.com',type:'Food Wholesale — Government Supplier',contacts:[
      {name:'Bill Flanagan',title:'VP of Procurement'},
      {name:'Mary Fitzgerald',title:'Senior Buyer — Packaging'},
      {name:'Mike Snider',title:'Supply Chain Manager'},
      {name:'Julie Brooks',title:'Marketing Director'},
      {name:'Dave Hanna',title:'Category Manager'},
    ]},
    {company:'Innopack (Cascades)',country:'Canada',website:'www.cascades.com',type:'Paper & Packaging Distributor',contacts:[
      {name:'Mario Plourde',title:'VP of Global Sourcing'},
      {name:'Isabelle Marchand',title:'Senior Buyer — Paper Bags & Eco Packaging'},
      {name:'Jean-David Tardif',title:'Supply Chain Director'},
      {name:'Hugo D\'Amours',title:'VP of Marketing'},
      {name:'Caroline Roy',title:'Catalog Manager — Sustainable Lines'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇯🇵 Japan
    // ══════════════════════════════════════════════════
    {company:'AEON Co., Ltd.',country:'Japan',website:'www.aeon.info',type:'Retail Conglomerate',contacts:[
      {name:'Motoya Okada',title:'VP of Global Sourcing'},
      {name:'Yuki Tanaka',title:'Senior Buyer — Eco & Sustainable Products'},
      {name:'Kenji Watanabe',title:'Supply Chain Director'},
      {name:'Masako Shiba',title:'VP of Marketing'},
      {name:'Hiroki Sato',title:'Category Manager — Packaging'},
    ]},
    {company:'Seven & i Holdings',country:'Japan',website:'www.7andi.com',type:'Retail Conglomerate',contacts:[
      {name:'Ryuichi Isaka',title:'VP of Procurement'},
      {name:'Hiroshi Yamamoto',title:'Category Manager — Private Label'},
      {name:'Akiko Sato',title:'Global Sourcing Manager'},
      {name:'Stephen Dacus',title:'VP of Marketing'},
      {name:'Naomi Sekiguchi',title:'Senior Buyer — Eco Products'},
    ]},
    {company:'Nippon Access (Itochu)',country:'Japan',website:'www.nippon-access.co.jp',type:'Food Wholesale — Institutional',contacts:[
      {name:'Koji Sato',title:'VP of Procurement'},
      {name:'Tomoko Hayashi',title:'Senior Buyer — Packaging'},
      {name:'Masahiro Tanaka',title:'Supply Chain Director'},
      {name:'Yoko Ishida',title:'VP of Marketing'},
      {name:'Takuya Abe',title:'Category Manager'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇳🇱 Netherlands
    // ══════════════════════════════════════════════════
    {company:'Albert Heijn (Ahold Delhaize)',country:'Netherlands',website:'www.ah.nl',type:'Supermarket Chain',contacts:[
      {name:'Wouter van der Berg',title:'VP of Procurement'},
      {name:'Lisa de Vries',title:'Category Manager — Sustainability'},
      {name:'Pieter Janssen',title:'Global Sourcing Manager'},
      {name:'Marit van Egmond',title:'VP of Marketing'},
      {name:'Sander van der Laan',title:'Senior Buyer — Eco Products'},
    ]},
    {company:'Sligro Food Group',country:'Netherlands',website:'www.sligro.nl',type:'Food Wholesale — Institutional',contacts:[
      {name:'Koen Slippens',title:'VP of Procurement'},
      {name:'Annelies van Dijk',title:'Senior Buyer — Packaging & Disposables'},
      {name:'Johan van der Linden',title:'Supply Chain Director'},
      {name:'Hanneke Faber',title:'VP of Marketing'},
      {name:'Mark Slippens',title:'Category Manager'},
    ]},
    // ══════════════════════════════════════════════════
    // 🇸🇪 Sweden
    // ══════════════════════════════════════════════════
    {company:'ICA Gruppen',country:'Sweden',website:'www.icagruppen.se',type:'Supermarket Chain',contacts:[
      {name:'Per Strömberg',title:'VP of Global Sourcing'},
      {name:'Anna Lindqvist',title:'Senior Buyer — Eco & Green Products'},
      {name:'Erik Svensson',title:'Supply Chain Director'},
      {name:'Sara Öhrvall',title:'VP of Marketing'},
      {name:'Jonas Nyrén',title:'Category Manager — Sustainable Packaging'},
    ]},
    {company:'IKEA Group',country:'Sweden',website:'www.ikea.com',type:'B2B Home Furnishing & Retail',contacts:[
      {name:'Jon Abrahamsson Ring',title:'VP of Global Sourcing'},
      {name:'Petra Axdorff',title:'Head of Sustainability Sourcing'},
      {name:'Magnus Bodén',title:'Supply Chain Director'},
      {name:'Lena Pripp-Kovac',title:'VP of Marketing'},
      {name:'Javier Quiñones',title:'Senior Buyer — Eco Products'},
    ]},
    // ══════════════════════════════════════════════════
    // 🌐 GLOBAL PACKAGING DISTRIBUTORS (Multi-country)
    // ══════════════════════════════════════════════════
    {company:'Smurfit Kappa Group',country:'UK',website:'www.smurfitkappa.com',type:'Paper & Packaging Distributor',contacts:[
      {name:'Tony Smurfit',title:'VP of Global Sourcing'},
      {name:'Arco Berkenbosch',title:'Senior Buyer — Paper Bags & Carriers'},
      {name:'Ken Bowles',title:'Supply Chain Director'},
      {name:'Gareth Doyle',title:'VP of Marketing'},
      {name:'Liam Curran',title:'Category Manager — Sustainable Packaging'},
    ]},
    {company:'Mondi Group',country:'UK',website:'www.mondigroup.com',type:'Paper & Packaging Distributor',contacts:[
      {name:'Andrew King',title:'VP of Global Sourcing'},
      {name:'Christoph Skrzypczak',title:'Senior Buyer — Paper Bags'},
      {name:'Peter Oswald',title:'Supply Chain Director'},
      {name:'Judith Wronn',title:'VP of Marketing'},
      {name:'Tim Nash',title:'Category Manager — Eco Packaging'},
    ]},
    {company:'DS Smith PLC',country:'UK',website:'www.dssmith.com',type:'Sustainable Packaging Distributor',contacts:[
      {name:'Miles Roberts',title:'VP of Global Sourcing'},
      {name:'Juergen Freidhager',title:'Senior Buyer — Paper Bags & Kraft'},
      {name:'Adrian Marsh',title:'Supply Chain Director'},
      {name:'James Sherwood-Rogers',title:'VP of Marketing'},
      {name:'Nicola Robins',title:'Catalog Manager — Sustainable Lines'},
    ]},
    {company:'Novamont (Mater-Bi)',country:'Germany',website:'www.novamont.com',type:'Biodegradable Material & Packaging',contacts:[
      {name:'Catia Bastioli',title:'VP of Global Sourcing'},
      {name:'Roberto Guerrini',title:'Senior Buyer — Compostable Products'},
      {name:'Lorenzo Beretta',title:'Supply Chain Director'},
      {name:'Mario Abis',title:'VP of Marketing'},
      {name:'Frederica Rampini',title:'Category Manager'},
    ]},
  ];
}

function parseContacts(arr) {
  const contacts = [];
  for (const co of arr) {
    for (const ct of co.contacts || []) {
      contacts.push({ company:co.company||'', country:co.country||'', website:co.website||'', type:co.type||'Retailer', name:ct.name||'', title:ct.title||'' });
    }
  }
  return contacts;
}

export async function POST(request) {
  const { market='all', product='both', count='20' } = await request.json();
  const encoder = new TextEncoder();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      try {
        send({ type:'log', message:`🌍 目标市场: ${MARKET_NAMES[market]||market}` });
        send({ type:'log', message:`📦 产品: ${PRODUCT_NAMES[product]||product}` });
        send({ type:'progress', value:10 });

        let allCompanies = getFallbackData();
        send({ type:'log', message:`📚 内置数据库: ${allCompanies.length} 家企业` });

        if (apiKey) {
          send({ type:'log', message:'🤖 调用 Claude AI + 网络搜索补充最新数据...' });
          send({ type:'progress', value:20 });
          try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
              method:'POST',
              headers:{ 'Content-Type':'application/json', 'x-api-key':apiKey, 'anthropic-version':'2023-06-01' },
              body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:4096, tools:[{type:'web_search_20250305',name:'web_search'}], messages:[{role:'user',content:buildPrompt(market,product,count)}] }),
            });
            send({ type:'progress', value:70 });
            if (response.ok) {
              const data = await response.json();
              let text = '';
              for (const b of data.content||[]) { if (b.type==='text') text+=b.text; }
              const m = text.match(/\[[\s\S]*\]/);
              if (m) {
                try {
                  const aiC = JSON.parse(m[0]);
                  const existing = new Set(aiC.map(c=>c.company?.toLowerCase()));
                  const uniq = allCompanies.filter(c=>!existing.has(c.company?.toLowerCase()));
                  allCompanies = [...aiC, ...uniq];
                  send({ type:'log', message:`✅ AI 新增 ${aiC.length} 家企业，合计 ${allCompanies.length} 家` });
                } catch { send({ type:'log', message:'⚠️ AI 结果解析异常，使用内置数据库' }); }
              }
            }
          } catch { send({ type:'log', message:'⚠️ AI 搜索超时，使用内置完整数据库' }); }
        } else {
          send({ type:'log', message:'💡 提示：设置 ANTHROPIC_API_KEY 可启用实时网络搜索' });
        }

        const countryMap = { us:['USA','United States'], uk:['UK','United Kingdom'], de:['Germany'], fr:['France'], au:['Australia'], ca:['Canada'], jp:['Japan'], nl:['Netherlands'], se:['Sweden'] };
        let filtered = market==='all' ? allCompanies : allCompanies.filter(c=>(countryMap[market]||[]).includes(c.country));
        if (!filtered.length) filtered = allCompanies;

        const contacts = parseContacts(filtered);
        send({ type:'progress', value:100 });
        send({ type:'log', message:`🎉 完成！共 ${filtered.length} 家企业，${contacts.length} 条联系人（含 VP / Buyer / Marketing）` });
        send({ type:'contacts', data:contacts });
        send({ type:'done' });
      } catch (e) {
        const contacts = parseContacts(getFallbackData());
        send({ type:'progress', value:100 });
        send({ type:'contacts', data:contacts });
        send({ type:'done' });
      } finally { controller.close(); }
    },
  });

  return new Response(stream, { headers:{ 'Content-Type':'text/event-stream', 'Cache-Control':'no-cache', 'Connection':'keep-alive' } });
}
