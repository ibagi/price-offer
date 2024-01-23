type Translations = Record<string, Record<string, string>>;

const translations: Translations = {
  hu: {
    'home.title': 'Új ajánlat',
    'home.tableHeader': 'Ajánlat tételei',
    'home.hint': "A 'Hozzáadás' gombbal adj tételeket az árajánlathoz.",
    'home.labels.project': 'Projekt',
    'home.labels.offerNumber': 'Ajánlat száma',
    'home.labels.offerDate': 'Kelt, dátum',
    'home.labels.offerPlace': 'Kelt, helyiség',
    'home.labels.validity': 'Érvényesség',
    'home.labels.taxRate': 'ÁFA kulcs',
    'home.labels.currency': 'Pénznem',
    'home.actions.clearAll': 'Összes törlése',
    'home.actions.add': 'Hozzáadás',
    'home.actions.delete': 'Törlés',
    'home.actions.preview': 'Előnézet',
    'home.tableColumns.item': 'Munka megnevezése',
    'home.tableColumns.unitPrice': 'Ár/db',
    'home.tableColumns.amount': 'Darab',
    'home.tableColumns.total': 'Érték',
    'home.tableColumns.workPrice': 'Marás',
    'home.tableColumns.materialPrice': 'Anyag',
    'home.summary.netto': 'Nettó: {{netto}}',
    'home.summary.brutto': 'Bruttó: {{brutto}}',

    'preview.title': 'Előnézet',
    'preview.actions.back': 'Vissza',
    'preview.actions.save': 'Mentés',
  },
}

export default translations;
