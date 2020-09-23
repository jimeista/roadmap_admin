import React, { useEffect, useRef, useState } from 'react'
import {
  YMaps,
  Map,
  Polygon,
  Polyline,
  Rectangle,
  Placemark,
} from 'react-yandex-maps'

import { useDispatch, useSelector } from 'react-redux'
import { setMapData } from '../features/roadmap/roadmapSlice'

export const CustomYandexMap = () => {
  const current = useSelector((state) => state.roadmap.current)
  const [isPlaceMarkDrawing, setIsPlaceMarkDrawing] = useState(false)
  const [isLineDrawing, setIsLineDrawing] = useState(false)
  const [isRectangleDrawing, setIsRectangleDrawing] = useState(false)
  const [polygons, setPolygons] = useState([])
  const [tempPolygons, setTempPolygons] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    saveData()
  }, [])

  const mapState = {
    center: [43.238949, 76.889709],
    zoom: 10,
  }

  function addNewPlacemark() {
    setPolygons(tempPolygons)
    setIsLineDrawing(false)
    setIsRectangleDrawing(false)
    setIsPlaceMarkDrawing(false)
    setTimeout(() => {
      setIsPlaceMarkDrawing(true)
    }, 200)
  }

  function addNewLine() {
    setPolygons(tempPolygons)
    setIsLineDrawing(false)
    setIsRectangleDrawing(false)
    setIsPlaceMarkDrawing(false)
    setTimeout(() => {
      setIsLineDrawing(true)
    }, 200)
  }
  function addNewRectangle() {
    setPolygons(tempPolygons)
    setIsLineDrawing(false)
    setIsRectangleDrawing(false)
    setIsPlaceMarkDrawing(false)
    setTimeout(() => {
      setIsRectangleDrawing(true)
    }, 200)
  }

  function saveData() {
    setPolygons(tempPolygons)
    const mapData = { ...polygons }
    // dispatch(setRoadWorksData({ mapData: mapData }))
    dispatch(setMapData(mapData))
  }

  const draw = (ref, type) => {
    ref.editor.startDrawing()
    console.log(ref)
    const index = polygons.length
    // switch (type) {
    //   case "placemark":
    //     ref.events.add("dragend", (event) => {
    //       console.log(event);
    //     });
    //     ref.events.add("mousedown", (event) => {
    //       console.log(event);
    //     });
    // }

    ref.geometry.events.add('change', (event) => {
      tempPolygons[index] = {
        type: type,
        coordinates: event.originalEvent.newCoordinates,
      }
    })
    ref.editor.events.add('onchange', (event) => {
      ref.startDrawing()
      // console.log(event.originalEvent.target.geometry._coordPath._coordinates);
    })
    ref.editor.events.add('drawingstop', (event) => {
      ref.editor.stopDrawing()
      ref.editor.stopDrawing()
    })
  }

  return (
    <>
      {current === 0 && (
        <div className='yandexMap__header'>
          <button onClick={addNewLine}>Добавить линию</button>
          <button onClick={addNewRectangle}>Добавить квадрат</button>
          <button onClick={addNewPlacemark}>Точка</button>
        </div>
      )}
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='100%'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          minWidth='100%'
          modules={['geoObject.addon.editor']}
        >
          {polygons.map((el, index) => {
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
            }
          })}
          {current === 0 && isPlaceMarkDrawing ? (
            <Placemark
              instanceRef={(ref) => {
                ref && draw(ref, 'placemark')
              }}
              geometry={[]}
              draggable={true}
            />
          ) : null}
          {current === 0 && isLineDrawing ? (
            <Polyline
              instanceRef={(ref) => {
                ref && draw(ref, 'polyline')
              }}
              geometry={[]}
              options={{
                editorDrawingCursor: 'crosshair',
                editorMaxPoints: 10,

                fillColor: '#00FF00',
                strokeColor: '#0000FF',
                strokeWidth: 5,
              }}
            />
          ) : null}
          {current === 0 && isRectangleDrawing ? (
            <Polygon
              instanceRef={(ref) => {
                ref && draw(ref, 'polygon')
              }}
              geometry={[]}
              options={{
                editorDrawingCursor: 'crosshair',
                editorMaxPoints: 5,

                fillColor: '#00FF00',
                strokeColor: '#0000FF',
                strokeWidth: 5,
              }}
            />
          ) : null}
        </Map>
      </YMaps>
    </>
  )
}
