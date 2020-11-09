import React from 'react';
import './App.css';
import bg from './img/1.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            brand:'--Select A Brand--',
            model:'--Select A Model--',
            age:12,
            kms:0,
            transmission:'Manual',
            owner:'',
            seller:'',
            check:true,
            submit:true,
            models:[],
            fuel:'',
            output:'',
            error:'',
            brands:Object.keys({"Chevrolet": ["Aveo", "Beat", "Captiva", "Cruze", "Enjoy", "Optra", "Sail", "Spark", "Tavera"], "Ford": ["Aspire", "EcoSport", "Endeavour", "Fiesta", "Figo", "Freestyle", "Fusion", "Ikon"], "Honda": ["Accord", "Amaze", "BR-V", "Brio", "CR-V", "City", "Civic", "Jazz", "Mobilio", "WR-V"], "Hyundai": ["Accent", "Creta", "Elantra", "Elite i20", "Eon", "Getz", "Grand i10", "Santa Fe", "Santro", "Sonata", "Tucson", "Venue", "Verna", "Xcent", "i10", "i20", "i20 active"], "Mahindra": ["Alturas", "Bolero", "Imperio", "Jeep", "KUV", "Marazzo", "NuvoSport", "Quanto", "Scorpio", "Supro", "TUV 300", "Thar", "Verito", "XUV300", "XUV500", "Xylo"], "Maruti": ["800", "A-Star", "Alto", "Baleno", "Brezza", "Celerio", "Ciaz", "Eeco", "Ertiga", "Esteem", "Estilo", "Gypsy", "Ignis", "Omni", "Ritz", "S-Cross", "S-Presso", "SX4", "Swift", "Swift Dzire", "Wagon R", "Zen"], "Renault": ["Captur", "Duster", "Fluence", "Koleos", "Kwid", "Lodgy", "Pulse", "Scala", "Triber"], "Tata": ["Altroz", "Aria", "Bolt", "Harrier", "Hexa", "Indica", "Indica Vista", "Indigo", "Manza", "Nano", "Nexon", "Safari", "Sumo", "Tiago", "Tigor", "Venture", "Winger", "Zest"], "Toyota": ["Camry", "Corolla", "Etios", "Fortuner", "Innova", "Qualis", "Yaris"], "Volkswagen": ["Ameo", "Jetta", "Passat", "Polo", "Vento"]}),
            dict:{"Chevrolet": ["Aveo", "Beat", "Captiva", "Cruze", "Enjoy", "Optra", "Sail", "Spark", "Tavera"], "Ford": ["Aspire", "EcoSport", "Endeavour", "Fiesta", "Figo", "Freestyle", "Fusion", "Ikon"], "Honda": ["Accord", "Amaze", "BR-V", "Brio", "CR-V", "City", "Civic", "Jazz", "Mobilio", "WR-V"], "Hyundai": ["Accent", "Creta", "Elantra", "Elite i20", "Eon", "Getz", "Grand i10", "Santa Fe", "Santro", "Sonata", "Tucson", "Venue", "Verna", "Xcent", "i10", "i20", "i20 active"], "Mahindra": ["Alturas", "Bolero", "Imperio", "Jeep", "KUV", "Marazzo", "NuvoSport", "Quanto", "Scorpio", "Supro", "TUV 300", "Thar", "Verito", "XUV300", "XUV500", "Xylo"], "Maruti": ["800", "A-Star", "Alto", "Baleno", "Brezza", "Celerio", "Ciaz", "Eeco", "Ertiga", "Esteem", "Estilo", "Gypsy", "Ignis", "Omni", "Ritz", "S-Cross", "S-Presso", "SX4", "Swift", "Swift Dzire", "Wagon R", "Zen"], "Renault": ["Captur", "Duster", "Fluence", "Koleos", "Kwid", "Lodgy", "Pulse", "Scala", "Triber"], "Tata": ["Altroz", "Aria", "Bolt", "Harrier", "Hexa", "Indica", "Indica Vista", "Indigo", "Manza", "Nano", "Nexon", "Safari", "Sumo", "Tiago", "Tigor", "Venture", "Winger", "Zest"], "Toyota": ["Camry", "Corolla", "Etios", "Fortuner", "Innova", "Qualis", "Yaris"], "Volkswagen": ["Ameo", "Jetta", "Passat", "Polo", "Vento"]}
            };  
  }
  handleBrandChange = (e) => {
    this.setState({ brand: e,check:false, models: this.state.dict[e] });
  }

  handleModelChange = (e) => {
    this.setState({ model: e });
  }

  handleAgeChange = (e) => {
    this.setState({ age: e.target.value});
  }

  handleKmChange = (e) => {
    
    this.setState({ kms: e.target.value });
  }

  handleTransmissionChange = (e) => {
    this.setState({ transmission: e.target.value });
  }

  handleOwnerChange = (e) => {
    this.setState({ owner: e.target.value });
  }


  handleSellerChange = (e) => {
    this.setState({ seller: e.target.value });
  }

  handleFuelChange = (e) => {
    this.setState({ fuel: e.target.value });
  }

  handleSubmit =(e) =>{
    e.preventDefault();
    let fields = {
      'Model'         : this.state.model,
      'vehicle_age'   : this.state.age,
      'km_driven'     : this.state.kms,
      'transmission'  : this.state.transmission,
      'owner'         : this.state.owner,
      'seller_type'   : this.state.seller,
      'fuel'          : this.state.fuel
    }
    axios.post("http://18.222.173.66:8000/predict_car_price",fields)
    .then((response) => {
      if(response){ 
        this.setState({output:response.data.estimated_price})
      }
    }, (error) => {  
      this.setState({error:error.response.data.message})
    }); 
  }

  render(){
  return (
    <div className="container-fluid">
      <div className="row" style={{"backgroundImage":"url(" + bg + ")","height":"850px"}}>   
        <div className="card  align-self-center mx-auto" style={{"width":"450px","height":"650px"}}>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                  <div className="text-center"><h4>Fill In The Details</h4></div>
                  <br/>
                  <div className="text-center" style={{"border-bottom": "solid black"}}></div>
                  <br/>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-6">
                           <DropdownButton
                                    alignRight
                                    title={this.state.brand}
                                    id="dropdown-menu-align-right"
                                    onSelect={this.handleBrandChange}
                                    style={{'color':'black'}}
                                  >
                                    {this.state.brands.map((keys)=>{
                                      return <Dropdown.Item eventKey={keys}>{keys}</Dropdown.Item>
                                    })}                                        
                            </DropdownButton>
                      </div>
                      <div className="col-6">
                            <DropdownButton
                                    alignRight
                                    title={this.state.model}
                                    id="dropdown-menu-align-right"
                                    onSelect={this.handleModelChange}
                                    disabled={this.state.check}
                                  >
                                    {this.state.brand!=='--Select A Brand--' ?
                                    this.state.models.map((values)=>{
                                      return <Dropdown.Item eventKey={values}>{values}</Dropdown.Item>
                                    }):null}                                                                            
                            </DropdownButton>
                      </div>
                    </div>            
                  </div>
                
                  <div className="form-group">
                    <h5>Vehicle Age: {this.state.age}</h5>                 
                    <div className="form-group">
                      <input type="range" className="form-control-range" min='0' max='25' step='1' value={this.state.age} onChange={this.handleAgeChange}/>
                    </div>
  

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <h5>Kilometers Driven</h5>
                          <input type="number" className="form-control" onChange={this.handleKmChange} placeholder="Kms" required/>
                        </div>
                      </div>
                      <div className="col-6">
                      <h5>Fuel Type</h5>
                        <div class="input-group mb-3" required>
                            <select className="custom-select" id="inputGroupSelect01" onChange={this.handleFuelChange}>
                              <option selected>Choose fuel type</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Petrol">Petrol</option>
                              <option value="CNG">CNG</option>
                              <option value="LPG">LPG</option>
                            </select>
                          </div>  
                      </div>
                    </div>
                </div>

                <div className="form-group">
                  <div className="row">
                      <div className="col-6">
                        <h5>Owner Type</h5>
                        <div class="input-group mb-3" required>
                            <select class="custom-select" id="inputGroupSelect01" onChange={this.handleOwnerChange}>
                              <option selected>Choose an owner</option>
                              <option value="First Owner">First Owner</option>
                              <option value="Second Owner">Second Owner</option>
                              <option value="Third Owner">Third Owner</option>
                              <option value="Fourth & Above Owner">Fourth & Above Owner</option>
                              <option value="Test Drive Car">Test Drive Car</option>
                            </select>
                          </div>                          
                      </div>
                      <div className="col-6">
                        <h5>Seller Type</h5>
                        <div class="input-group mb-3" required>
                            <select class="custom-select" id="inputGroupSelect01" onChange={this.handleSellerChange}>
                              <option selected>Choose a seller</option>
                              <option value="Individual">Individual</option>
                              <option value="Dealer">Dealer</option>
                              <option value="Trustmark Dealer">Trustmark Dealer</option>
                            </select>
                          </div> 
                      </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="d-flex justify-content-center"><h5>Transmission Type</h5></div>
                    
                        <div className="btn-group btn-group-toggle d-flex justify-content-center" data-toggle="buttons" >
                          <label className="btn btn-light active">
                            <input type="radio" name="options" value="Manual" id="option1" autocomplete="off" checked onClick={this.handleTransmissionChange}/> Manual
                          </label>
                          <label className="btn btn-light">
                            <input type="radio" name="options" id="option2" value="Automatic" autocomplete="off" onClick={this.handleTransmissionChange}/> Automatic
                          </label>  
                        
                    
                  </div>
                </div>

                <br/>

                <div className="row justify-content-center">
                    <button type="submit"  className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" disabled={this.state.brand==='--Select A Brand--' || this.state.model==='--Select A Model--' || this.state.kms===0 || this.state.owner.length===0 || this.state.fuel.length===0 || this.state.seller.length===0}>Submit</button>
                </div>

                <br/>

                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Estimated Price</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        {this.state.output}
                      </div>
                    </div>
                  </div>
                </div>
            </form>                     
          </div>
        </div>
        </div>
    </div>
  
  );
}
}

export default App;
