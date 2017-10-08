import React, { Component } from 'react'
import { render } from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
//import Intro from './components/presentation/Intro'
import { GMaps, MapWithASearchBox } from './components/containers'

const app = (
	<Provider store={store.configure(null)}>
		<div className="container">
			<MapWithASearchBox />
		</div>
	</Provider>
)
render(app, document.getElementById('root'))