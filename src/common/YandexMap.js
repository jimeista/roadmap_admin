import React, { useState } from 'react'
import { YMaps, Map, Polygon, Polyline, Placemark } from 'react-yandex-maps'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

// import { setMapData } from '../features/roadmap/roadmapSlice'

export const CustomYandexMap = () => {
  const { current } = useSelector((state) => state.roadmap)
  const [isDrawing, setIsDrawing] = useState({
    // isLineDrawing: false,
    isPlaceMarkDrawing: false,
    // isRectangleDrawing: false,
  })
  // const [isPlaceMarkDrawing, setIsPlaceMarkDrawing] = useState(false)
  // const [isLineDrawing, setIsLineDrawing] = useState(false)
  // const [isRectangleDrawing, setIsRectangleDrawing] = useState(false)
  const [polygons, setPolygons] = useState()

  const mapState = {
    center: [43.238949, 76.889709],
    zoom: 10,
  }
  console.log(polygons)

  const draw = (mapRef) => {
    // console.log(polygons)
    mapRef.events.add('click', (e) => {
      const coords = e.get('coords')
      setPolygons(coords)
    })
  }

  return (
    <React.Fragment>
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='calc(100% - 50px)'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          modules={['geoObject.addon.editor']}
          instanceRef={(ref) => ref && draw(ref)}
        >
          <Placemark geometry={polygons} />
          {current === 0 && renderButtons(setIsDrawing)}
          {/* {renderAllCoordinates(polygons)} */}
          {/* {current === 0 && renderCoordinate(isDrawing)} */}
        </Map>
      </YMaps>
    </React.Fragment>
  )
}

const renderCoordinate = (isDrawing, draw) => {
  const poly_option = {
    editorDrawingCursor: 'crosshair',
    editorMaxPoints: 5,

    fillColor: '#00FF00',
    strokeColor: '#0000FF',
    strokeWidth: 5,
  }

  return (
    <>
      {isDrawing.isPlaceMarkDrawing && (
        <Placemark
          // instanceRef={(ref) => ref && draw(ref, 'placemark')}
          geometry={[]}
          draggable={true}
        />
      )}
      {/* {isDrawing.isLineDrawing && (
        <Polyline
          // instanceRef={(ref) => {
          //   ref && draw(ref, 'polyline')
          // }}
          geometry={[]}
          options={poly_option}
        />
      )}
      {isDrawing.isRectangleDrawing && (
        <Polygon
          // instanceRef={(ref) => {
          //   ref && draw(ref, 'polygon')
          // }}
          geometry={[]}
          options={poly_option}
        />
      )} */}
    </>
  )
}

const renderButtons = (setIsDrawing) => {
  return (
    <div className='yandexMap__header'>
      {/* <Button
        style={{ margin: 10, marginLeft: 0 }}
        onClick={() =>
          setIsDrawing((state) => ({
            isPlaceMarkDrawing: false,
            isRectangleDrawing: false,
            isLineDrawing: true,
          }))
        }
      >
        Добавить линию
      </Button>
      <Button
        style={{ margin: 10, marginLeft: 0 }}
        onClick={() =>
          setIsDrawing((state) => ({
            isPlaceMarkDrawing: false,
            isRectangleDrawing: true,
            isLineDrawing: false,
          }))
        }
      >
        Добавить квадрат
      </Button> */}
      <Button
        style={{ margin: 10, marginLeft: 0 }}
        onClick={() =>
          setIsDrawing((state) => ({
            isPlaceMarkDrawing: true,
            // isRectangleDrawing: false,
            // isLineDrawing: false,
          }))
        }
      >
        Точка
      </Button>
    </div>
  )
}

const renderAllCoordinates = (arr) => {
  arr.map((el, index) => {
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
        return <Placemark key={index} geometry={el.coordinates} />
      default:
        return null
    }
  })
}
