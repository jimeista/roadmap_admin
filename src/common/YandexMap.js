import React, { useEffect, useState, useRef } from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import { useDispatch, useSelector } from 'react-redux'

import { setMapData } from '../features/roadmap/roadmapSlice'
import { renderButtons, renderPolygons } from '../utils/yandex_helper'

const mapState = {
  center: [43.238949, 76.889709],
  zoom: 10,
}

export const CustomYandexMap = () => {
  const { current, mapData } = useSelector((state) => state.roadmap)
  const dispatch = useDispatch()
  const [active, setActive] = useState('')

  let mapref = useRef()
  console.log('mapdata on reload', mapData)

  useEffect(() => {
    const ref = mapref.current

    const addClickListener = (e, type) => {
      const coordinates = e.get('coords')
      dispatch(setMapData({ type: active, coordinates }))
    }

    if (ref && active === 'placemark') {
      ref.events.add('click', addClickListener)
    }

    return () => {
      if (ref) {
        ref.events.remove('click', addClickListener)
      }
    }
  }, [mapref, active, dispatch])

  return (
    <React.Fragment>
      {current === 0 && renderButtons(active, setActive)}
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='calc(100% - 50px)'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          modules={['geoObject.addon.editor']}
          instanceRef={mapref}
        >
          {renderPolygons(mapData)}
        </Map>
      </YMaps>
    </React.Fragment>
  )
}
