export const MENU_ITEMS = [
  {
    key: 'technicalhub',
    icon: 'mdi:office-building',
    label: 'TechnicalHub',
    children: [
      {
        key: 'th-add-employee',
        label: 'Add Employee',
        parentKey: 'technicalhub',
        children: [
          {
            key: 'th-bulk-upload',
            label: 'Bulk Upload',
            url: '/employees-spreadsheet',
            parentKey: 'th-add-employee'
          },
          {
            key: 'th-single-upload',
            label: 'Single Upload',
            url: '/add-employee',
            parentKey: 'th-add-employee'
          }
        ]
      },
      {
        key: 'th-update-employee',
        label: 'Update Employee',
        url: '/add-employee',
        parentKey: 'technicalhub'
      },
      {
        key: 'th-delete-employee',
        label: 'Delete Employee',
        url: '/delete-employees',
        parentKey: 'technicalhub'
      },
      {
        key: 'th-create-projects',
        label: 'Create Projects',
        url: '/create-projects',
        parentKey: 'technicalhub'
      }
    ]
  },
  {
    key: 'aditya',
    icon: 'mdi:school',
    label: 'Aditya',
    children: [
      {
        key: 'ad-add-employee',
        label: 'Add Employee',
        parentKey: 'aditya',
        children: [
          {
            key: 'ad-bulk-upload',
            label: 'Bulk Upload',
            url: '/employees-spreadsheet',
            parentKey: 'ad-add-employee'
          },
          {
            key: 'ad-single-upload',
            label: 'Single Upload',
            url: '/add-employee',
            parentKey: 'ad-add-employee'
          }
        ]
      },
      {
        key: 'ad-update-employee',
        label: 'Update Employee',
        url: '/add-employee',
        parentKey: 'aditya'
      },
      {
        key: 'ad-delete-employee',
        label: 'Delete Employee',
        url: '/delete-employees',
        parentKey: 'aditya'
      },
      {
        key: 'ad-create-projects',
        label: 'Create Projects',
        url: '/create-projects',
        parentKey: 'aditya'
      }
    ]
  }
];
