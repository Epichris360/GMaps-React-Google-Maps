import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react'
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox"

const MyMapComponent = compose(
    withProps({
        googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDNLsWzbB4Z3MfUQW50dKQ15kFKxtiAwAc&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height:`100%`}} />,
        containerElement: <div style={{height: `500px`}} />,
        mapElement: <div style={{height: `550px`}} />
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{lat:40.741648, lng:-73.983607}} 
    >
        {props.isMarkerShown && 
            <div>
                {
                    props.markers.map((m,i) => {
                        return(
                            <Marker key={i} position={m} onClick={props.onMarkerClick} />
                        )
                    })
                }
            </div>
        }
    </GoogleMap>
)

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDNLsWzbB4Z3MfUQW50dKQ15kFKxtiAwAc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol>
  </div>
);

class GMaps extends Component{
    constructor(props){
        super(props)
        this.state = {
            lat:'',
            lng:'',
            isMarkerShown: false,
            markers:[
                {lat:40.741648, lng:-73.983607},
                {lat:40.745598, lng:-73.82567999999998}
            ],
            list:[
                { lat:40.7530076, lng:-73.97463870000001 },
                { lat:40.796989, lng:-73.96970699999997 },
                { lat:40.79738529999999, lng:-73.94908529999998 }
            ]
        }
    }
    submitCoor(){
        let { lat, lng, markers } = this.state
        markers.push({ lat:parseFloat(lat), lng:parseFloat(lng)})
        this.setState({ markers:markers})
        this.setState({lat:''})
        this.setState({lng:''})
        this.setState({isMarkerShown:!this.state.isMarkerShown})
        setTimeout( () => {
            this.setState({isMarkerShown:!this.state.isMarkerShown})
        },50)
    }
    componentDidMount(){
        this.delayedShowMarker()
    }
    delayedShowMarker(){
        setTimeout( () => {
            this.setState({isMarkerShown: true})
        },3000)
    }
    render(){
        return(
            <div className="row">
                <h1> This is the app </h1>
                <div className="col-md-6 col-xs-6" >
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Latitude"
                        onChange={ e => this.setState({lat:e.target.value}) }
                        value={this.state.lat}
                    />
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="longitude"
                        onChange={ e => this.setState({lng:e.target.value}) }
                        value={this.state.lng}
                    />
                    <button 
                        className="btn btn-success"
                        onClick={this.submitCoor.bind(this)}
                    > 
                        Submit!
                    </button>
                    <button onClick={ () => console.log('this.state',this.state) }>
                        state?
                    </button> 
                    <br/>
                    <strong>Example of lat and lng coordinates</strong>
                    {
                        this.state.list.map((l,i) => {
                            return(
                                <div key={i}>{`lat:${l.lat} : lng:${l.lng}`}</div>
                            )
                        })
                    }
                    <br/>
                    <br/>
                    <PlacesWithStandaloneSearchBox />
                </div>
                <div className="col-md-6 col-xs-6" >
                    <MyMapComponent 
                        markers={this.state.markers}
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                    />
                    
                </div>
                
            </div>
        )
    }

}

export default GMaps