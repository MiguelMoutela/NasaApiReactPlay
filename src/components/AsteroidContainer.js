import React from 'react';


class AsteroidContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageNumber: 0,
      asteroids: []
    }
    this.makeRequest = this.makeRequest.bind(this);
  }

  makeRequest() {
    let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?&page=${this.state.pageNumber}&size=21&api_key=ioj9XUGwG6dE90MkK3Wv3CEk0q0vLMAH5BP8kA87`;
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('load', () => {
      if (request.status !== 200) return;
      const jsonString = request.responseText;
      const asteroids = JSON.parse(jsonString);
      this.setState({asteroids: asteroids.near_earth_objects, pageNumber: this.state.pageNumber + 1});
    })
  }

  componentDidMount() {
    this.makeRequest();
  }


  render(){
    if (this.state.asteroids.length === 0) return null;
    console.log(this.state.asteroids);

    const greenRed = function(asteroid) {
      if (asteroid.is_potentially_hazardous_asteroid.toString() === 'true') {
       return  <td className= "true">{ asteroid.is_potentially_hazardous_asteroid.toString() }</td>
      }
      else {
      return  <td className= "false">{ asteroid.is_potentially_hazardous_asteroid.toString() }</td>
      }
    }

    const Display20 = this.state.asteroids.map(function(asteroid) {
      return(
        <tr>
          <td>{asteroid.name}</td>
          { greenRed(asteroid) }
        </tr>
      )
    });

    return(
      <div>

        <table>
          <thead>
            <tr>
              <td>name</td>
              <td>hazardous?</td>
            </tr>
          </thead>
          <tbody>
           {Display20}
          </tbody>
        </table>
        <button onClick= {this.makeRequest} >Next Page</button>
      </div>
    );
  }
}

export default AsteroidContainer;
