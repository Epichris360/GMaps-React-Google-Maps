import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React, { Component } from 'react'
import SearchBox from "react-google-maps/lib/components/places/SearchBox"

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