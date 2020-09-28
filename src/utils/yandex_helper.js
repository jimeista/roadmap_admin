import React from 'react'
import { Polygon, Polyline, Placemark } from 'react-yandex-maps'
import { Button } from 'antd'

export const renderGeoObject = (polygons) => {
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
      // case 'placemark':
      //   return (
      //     <Placemark
      //       key={index}
      //       geometry={el.coordinates}
      //       options={{ draggable: true }}
      //     />
      //   )
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
      {/* <Button
        type={active === 'placemark' && 'primary'}
        style={{ margin: 10, marginLet: 0 }}
        onClick={() =>
          active === 'placemark' ? setActive('') : setActive('placemark')
        }
      >
        Точка
      </Button> */}
    </div>
  )
}

export const createGeoObject = (active, draw) => {
  const options = {
    editorDrawingCursor: 'crosshair',
    editorMaxPoints: 10,
    fillColor: '#00FF00',
    strokeColor: '#0000FF',
    strokeWidth: 5,
  }

  // if (active === 'placemark') {
  //   return (
  //     <Placemark
  //       instanceRef={(ref) => ref && draw(ref, active)}
  //       geometry={[]}
  //       draggable={true}
  //     />
  //   )
  // }

  if (active === 'polygon') {
    return (
      <Polygon
        instanceRef={(ref) => ref && draw(ref, active)}
        geometry={[]}
        options={{ ...options, editorMaxPoints: 5 }}
      />
    )
  }

  if (active === 'polyline') {
    return (
      <Polyline
        instanceRef={(ref) => ref && draw(ref, active)}
        geometry={[]}
        options={options}
      />
    )
  }

  return null
}

export const renderIntersection = (ob) => {
  return (
    ob.type === 'Point' && (
      <Placemark geometry={ob.coordinates} options={{ draggable: true }} />
    )
  )
}
