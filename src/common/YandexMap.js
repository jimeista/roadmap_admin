import React, { useEffect, useState } from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import { useDispatch, useSelector } from 'react-redux'

import { setMapData } from '../features/roadmap/roadmapSlice'
import {
  renderButtons,
  renderIntersection,
  renderGeoObject,
  createGeoObject,
} from '../utils/yandex_helper'
import { usePrevious } from '../utils/usePrevious'

const mapState = {
  center: [43.238949, 76.889709],
  zoom: 10,
}

export const CustomYandexMap = () => {
  const { current, mapData, intersection } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()

  const [active, setActive] = useState('')
  const [geoObject, setGeoObject] = useState(null)
  const [polygons, setPolygons] = useState([])
  const previousState = usePrevious({ active, polygons })

  useEffect(() => {
    const draw = async (ref, type) => {
      ref.editor.startDrawing()

      ref.geometry.events.add('change', (e) => {
        setPolygons((state) => [
          { type, coordinates: e.originalEvent.newCoordinates },
        ])
      })

      ref.editor.events.add('onchange', (event) => {
        ref.startDrawing()
      })
      ref.editor.events.add('drawingstop', (event) => {
        ref.editor.stopDrawing()
      })

      if (current !== 0) {
        ref.editor.stopDrawing()
        setActive('')
      }
    }
    setGeoObject(createGeoObject(active, draw))
  }, [active, current])

  useEffect(() => {
    if (previousState && previousState.active !== active) {
      polygons.length > 0 &&
        previousState.polygons === polygons &&
        dispatch(setMapData(polygons))
    }

    return () => {
      previousState && previousState.active !== active && setPolygons([])
    }
  }, [active, polygons, previousState, dispatch])

  return (
    <>
      {current === 0 && renderButtons(active, setActive)}
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='calc(100% - 50px)'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          modules={['geoObject.addon.editor']}
        >
          {geoObject}
          {renderIntersection(intersection)}
          {renderGeoObject(mapData)}
        </Map>
      </YMaps>
    </>
  )
}
