import React from 'react'

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

export const setWorkListDataSourceHelper = (arr) => {
  const dataSource = arr.map((i, index) => {
    let keys = { '№': index + 1, key: index + 1 }
    Object.keys(i).forEach((key) => {
      if (key === 'status') {
        Object.keys(i[key]).forEach((k) => (keys = { ...keys, [k]: i[key][k] }))
      } else {
        keys = { ...keys, [key]: i[key] }
      }
    })
    return keys
  })

  return dataSource
}

export const setCrossListDataSourceHelper = (arr, intersections) => {
  let columns = []
  if (intersections.status === 'success') {
    columns = intersections.data.map((i, index) => {
      let ob = {
        '№': index + 1,
        key: index + 1,
        address: 'some street',
      }

      i['roadwork-ids'].forEach((id, key) => {
        ob = {
          ...ob,
          category: arr.find((i) => i.id === id).category,
          [`Работа ${key + 1}`]: id,
        }
      })

      return ob
    })

    return columns
  }

  const dataSource = arr.map((i, index) => {
    let keys = { '№': index + 1, key: index + 1 }
    Object.keys(i).forEach((key) => {
      keys = { ...keys, [key]: i[key] }
    })
    return keys
  })

  return dataSource
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
    align: 'center',
  },
  {
    title: 'Улица',
    dataIndex: 'address',
    key: 'address',
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
  },
  {
    title: 'Категория работ',
    dataIndex: 'category',
    key: 'category',
    filters: setFilterSelectsHelper(categories),
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
  {
    title: 'Отв орган',
    dataIndex: 'organisation',
    key: 'organisation',
    filters: setFilterSelectsHelper(organisations),
    onFilter: (value, record) => record.organisation.indexOf(value) === 0,
  },
  {
    title: 'Дата начала',
    dataIndex: 'start-date',
    key: 'start-date',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Дата окончания',
    dataIndex: 'end-date',
    key: 'end-date',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Статус (%)',
    dataIndex: 'percentage',
    key: 'percentage',
    editable: true,
    width: '5%',
    rule: true,
    type: 'number',
  },
]

export const setCrossListTableColumnsHelper = (
  categories,
  setVisible,
  setRecord,
  intersections,
  data
) => {
  let arr = []

  if (intersections.status === 'success') {
    let count = 0
    intersections.data.forEach((i) => {
      if (i['roadwork-ids'].length > count) {
        count = i['roadwork-ids'].length
      }
    })

    for (let i = 0; i < count; i++) {
      arr = [
        ...arr,
        {
          title: `Работа ${i + 1}`,
          dataIndex: `Работа ${i + 1}`,
          key: `Работа ${i + 1}`,
          width: '10%',
          align: 'center',
        },
      ]
    }
  }

  const cols = [
    {
      title: '№',
      dataIndex: '№',
      key: '№',
      width: '2%',
      align: 'center',
    },
    {
      title: 'Улица',
      dataIndex: 'address',
      key: 'address',
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
      title: 'Категория работ',
      dataIndex: 'category',
      key: 'category',
    },
  ]

  return [...cols, ...arr]
}

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

export const findLotName = (id, data) =>
  //should return lot-name not id
  data.find((i) => i.id === id).id

export const postNewRoadWork = (data, categories, organisations, regions) => {
  let ob = {}
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      if (key === 'end-date' || key === 'start-date') {
        data[key].length > 4
          ? (ob = { ...ob, [key]: data[key] })
          : (ob = { ...ob, [key]: `${data[key]}-01-01` })
      }
      // else if (key === 'category') {
      //   const id = categories.data.find((o) => o.name === data[key]).id
      //   ob = { ...ob, 'category-id': id }
      // }
      // else if (key === 'organisation') {
      //   const id = organisations.data.find((o) => o.name === data[key]).id
      //   ob = { ...ob, 'organisation-id': id }
      // }
      // else if (key === 'region') {
      //   const id = regions.data.find((o) => o.name === data[key]).id
      //   ob = { ...ob, 'region-id': id }
      // }
      else if (key === 'percentage') {
        const obb = {
          percentage: data[key],
          'is-hidden': data['is-hidden'],
          'is-canceled': data['is-canceled'],
          commentray: data.commentary,
        }

        let new_obb = {}

        Object.keys(obb).forEach((o) => {
          if (obb[o] !== undefined) {
            new_obb = { ...new_obb, [o]: obb[o] }
          }
        })

        ob = { ...ob, status: new_obb }
      } else {
        ob = { ...ob, [key]: data[key] }
      }
    }
    // if (key === 'is-canvas-opened' || key === 'is-closured') {
    //   ob = { ...ob, [key]: false }
    // }
  })

  return ob
}
