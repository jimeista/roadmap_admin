import React from 'react'

export const setDataSourceHelper = (arr) => {
  const dataSource = arr.map((i, index) => {
    let keys = { '№': index + 1, key: index + 1 }
    Object.keys(i).map((key) => {
      keys = { ...keys, [key]: i[key] }
    })
    return keys
  })

  return dataSource
}

export const setFilterSelectsHelper = (response) => {
  let ob = {}
  let result = []
  if (response.status === 'success') {
    const data = response.data
    for (let i = 0; i < data.length; i++) {
      ob = { ...ob, [data[i].name]: data[i].name }
    }
    result = Object.keys(ob).map((key) => ({ text: key, value: key }))
  }
  return result
}

export const setWorkListTableColumnsHelper = (
  organisations,
  categories,
  setVisible,
  setRecord
) => [
  {
    title: '№',
    dataIndex: '№',
    key: '№',
    width: '2%',
  },
  {
    title: 'Улица',
    dataIndex: 'address',
    key: 'address',
    editable: true,
    render: (text, record) => (
      <a
        onClick={() => {
          setRecord(record)
          setVisible(true)
        }}
      >
        {text}
      </a>
    ),
  },
  {
    title: 'Участок',
    dataIndex: 'area',
    key: 'area',
    editable: true,
  },
  {
    title: 'Категория работ',
    dataIndex: 'category',
    key: 'category',
    editable: true,
    type: 'select',
    rule: true,
    placeholder: 'Категоря работ',
    filters: setFilterSelectsHelper(categories),
    data:
      categories.status === 'success' ? categories.data.map((r) => r.name) : [],
  },
  {
    title: 'Отв орган',
    dataIndex: 'organisation',
    key: 'organisation',
    editable: true,
    type: 'select',
    rule: true,
    filters: setFilterSelectsHelper(organisations),
    placeholder: 'Ответсвенный орган',
    data:
      organisations.status === 'success'
        ? organisations.data.map((o) => o.name)
        : [],
  },
  {
    title: 'Дата начала',
    dataIndex: 'start-date',
    key: 'start-date',
    editable: true,
    rule: true,
    width: '10%',
    type: 'picker',
  },
  {
    title: 'Дата окончания',
    dataIndex: 'end-date',
    key: 'end-date',
    rule: true,
    editable: true,
    type: 'picker',
    width: '10%',
  },
  {
    title: 'Статус (%)',
    dataIndex: 'status-percentage',
    key: 'status-percentage',
    editable: true,
    width: '5%',
    rule: true,
    type: 'number',
  },
]

export const nameEnToRuWorkListHelper = (name) => {
  switch (name) {
    case 'area':
      return 'Участок'
    case 'address':
      return 'Адрес/улица'
    case 'contractor':
      return 'Подрядчик'
    case 'category':
      return 'Категоря работ'
    case 'end-date':
      return 'Дата окончания'
    case 'start-date':
      return 'Дата начала'
    case 'closure-descr':
      return 'Описание перекрытия'
    case 'organisation':
      return 'Ответсвенный орган'
    case 'file-paths':
      return 'Файл'
    case 'lot-name':
      return 'Лот'
    case 'percentage':
      return 'Статус исполнения (%)'
    case 'region':
      return 'Район'
    case 'supervisor-name':
      return 'ФИО руководителя'
    case 'contacts':
      return 'Контакты'
    case 'warranty-period':
      return 'Гарантийный период'
    case 'canvas-descr':
      return 'Описание вскрытия'
    case 'company-name':
      return 'Наименование компании'
    case 'canceled-comment':
      return 'Комментарий закупа отмены'
    case 'percentage-comment':
      return 'Комментарий статуса %'
    // case 'is-hidden':
    //   return 'Скрыт'
    // case 'is-canceled':
    //   return 'Приостановлен'
    default:
      return name
  }
}

export const prepareToShowDetailsObToArr = (ob) => {
  const arr = []

  Object.keys(ob).map((key) => {
    if (
      typeof ob[key] !== 'undefined' &&
      typeof ob[key] !== 'object' &&
      typeof ob[key] !== 'boolean' &&
      key !== 'key' &&
      key !== 'id'
    ) {
      arr.push({ name: key, value: ob[key] })
    }
  })

  return arr
}
