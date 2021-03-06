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
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              setRecord(record)
              setVisible(true)
            }}
          >
            {text}
          </a>
        )
      },
    },
    {
      title: 'Категория работ',
      dataIndex: 'category',
      key: 'category',
    },
  ]

  return [...cols, ...arr]
}
