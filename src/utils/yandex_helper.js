import React from 'react'
import { Polygon, Polyline, Placemark } from 'react-yandex-maps'
import { Button } from 'antd'

export const renderPolygons = (polygons) => {
  return polygons.map((el, index) => {
    switch (el.type) {
      case 'polyline':
        return (
          <Polyline
            key={index}
            geometry={el.coordinates}
            options={{
              fillColor: '#00FF00',
              strokeColor: '#0000FF',
              strokeWidth: 5,
            }}
          />
        )
      case 'polygon':
        return (
          <Polygon
            key={index}
            geometry={el.coordinates}
            options={{
              editorDrawingCursor: 'crosshair',
              editorMaxPoints: 5,
              fillColor: '#00FF00',
              strokeColor: '#0000FF',
              strokeWidth: 5,
            }}
          />
        )
      case 'placemark':
        return (
          <Placemark
            key={index}
            geometry={el.coordinates}
            options={{ draggable: true }}
          />
        )
      default:
        return null
    }
  })
}

export const renderButtons = (active, setActive) => {
  return (
    <div className='yandexMap__header'>
      <Button
        type={active === 'polyline' && 'primary'}
        style={{ margin: 15, marginLeft: 0 }}
        onClick={() =>
          active === 'polyline' ? setActive('') : setActive('polyline')
        }
      >
        Добавить линию
      </Button>
      <Button
        type={active === 'polygon' && 'primary'}
        style={{ margin: 10, marginLet: 0 }}
        onClick={() =>
          active === 'polygon' ? setActive('') : setActive('polygon')
        }
      >
        Добавить квадрат
      </Button>
      <Button
        type={active === 'placemark' && 'primary'}
        style={{ margin: 10, marginLet: 0 }}
        onClick={() =>
          active === 'placemark' ? setActive('') : setActive('placemark')
        }
      >
        Точка
      </Button>
    </div>
  )
}
