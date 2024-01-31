type Translations = Record<string, Record<string, string>>;

const translations: Translations = {
  hu: {
    'navigation.priceOffer': 'Árajánlat',
    'navigation.partners': 'Partnerek',
    'navigation.company': 'Cég adatok',
    'navigation.preview': 'Előnézet',
    'priceOffer.title': 'Árjánlat',
    'priceOffer.tableHeader': 'Ajánlat tételei',
    'priceOffer.hint': "A 'Hozzáadás' gombbal adj tételeket az árajánlathoz.",
    'priceOffer.labels.partner': 'Partner',
    'priceOffer.labels.project': 'Projekt',
    'priceOffer.labels.offerNumber': 'Ajánlat száma',
    'priceOffer.labels.offerDate': 'Kelt, dátum',
    'priceOffer.labels.offerPlace': 'Kelt, helyiség',
    'priceOffer.labels.validity': 'Érvényesség (nap)',
    'priceOffer.labels.taxRate': 'ÁFA kulcs (%)',
    'priceOffer.labels.currency': 'Pénznem',
    'priceOffer.tooltips.partner': 'Partnerek megadása',
    'priceOffer.actions.clearAll': 'Összes törlése',
    'priceOffer.actions.add': 'Hozzáadás',
    'priceOffer.actions.delete': 'Törlés',
    'priceOffer.actions.preview': 'Előnézet',
    'priceOffer.tableColumns.item': 'Munka megnevezése',
    'priceOffer.tableColumns.unitPrice': 'Ár/db',
    'priceOffer.tableColumns.amount': 'Darab',
    'priceOffer.tableColumns.total': 'Érték',
    'priceOffer.tableColumns.workPrice': 'Marás',
    'priceOffer.tableColumns.materialPrice': 'Anyag',
    'priceOffer.summary.netto': 'Nettó: {{netto}} {{currency}}',
    'priceOffer.summary.tax': 'ÁFA: {{tax}} {{currency}}',
    'priceOffer.summary.brutto': 'Bruttó: {{brutto}} {{currency}}',
    'preview.title': 'Árajánlat',
    'preview.actions.back': 'Vissza',
    'preview.actions.print': 'Nyomtatás',
    'preview.labels.from': 'Küldő/Von/From',
    'preview.labels.to': 'Címzett/An/To',
    'preview.labels.phone': 'Mobiltelefon:',
    'preview.labels.email': 'Email:',
    'preview.labels.address': 'Cím:',
    'preview.labels.companyNumber': 'Cégjegyzéksz.:',
    'preview.labels.taxNumber': 'Adószám:',
    'preview.labels.bankAccountNumber': 'Bankszámlaszám:',
    'preview.labels.offerNumber': 'Ajánlat száma:',
    'preview.greeting': 'Tisztelt Partnerünk!',
    'preview.tableLabel': 'Mellékelten küldjük a kért árajánlatot:',
    'preview.table.offerNumber': 'Ajánlat száma',
    'preview.table.itemName': 'Munka megnevezése',
    'preview.table.amount': 'Darab',
    'preview.table.unitPrice': 'Ár/db',
    'preview.table.price': 'Érték',
    'preview.table.description': 'Leírás, megjegyzések',
    'preview.table.workPrice': 'Marás',
    'preview.table.materialPrice': 'Anyag',
    'preview.table.netto': 'Nettó: ',
    'preview.table.tax': 'ÁFA: ',
    'preview.table.brutto': 'Bruttó: ',
    'preview.labels.project': 'Projekt megnevezése:',
    'preview.labels.taxation': 'Számlázás:',
    'preview.fields.taxation': 'Áfa: {{tax}} %',
    'preview.labels.validity': 'Ajánlat érvényessége:',
    'preview.fields.validity': '{{days}} nap',
    'preview.farawell':
      'A további együttműködés reményében köszönjük megtisztelő megkeresését!',
    'preview.regards': 'Üdvözlettel: ',
    'partners.title': 'Partnerek',
    'partners.actions.add': 'Hozzáadás',
    'partners.actions.back': 'Vissza az ajánlathoz',
    'partners.hint': 'Úgy néz ki még nem rögzített partnert.',
    'partners.actions.addPartner': 'Partner rögzítése',
    'partners.actions.delete': 'Törlés',
    'partners.tableColumns.name': 'Partner neve',
    'partners.tableColumns.address': 'Cím',
    'partners.tableColumns.companyNumber': 'Cégjegyzékszám',
    'partners.tableColumns.taxNumber': 'Adószám',
    'company.title': 'Árajánlaton megjelenő cég adatok',
    'company.labels.title': 'Küldő címsor 1:',
    'company.labels.subtitle': 'Küldő címsor 2:',
    'company.labels.phone': 'Mobiltelefon:',
    'company.labels.email': 'Email:',
    'company.labels.address': 'Cím:',
    'company.labels.companyNumber': 'Cégjegyzékszám:',
    'company.labels.taxNumber': 'Adószám:',
    'company.labels.bankAccountNumber': 'Bankszámlaszám:',
    'company.labels.person': 'Aláírt:',
  },
};

export default translations;
