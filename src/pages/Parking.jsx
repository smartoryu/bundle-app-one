import React, { Component } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { paymentPark } from "../redux/actions";

class Parking extends Component {
  state = {
    clicked: 0,
    vehicle: "",
    fee: 0
  };

  componentDidMount() {
    document.title = "Parking-app";
  }

  clickEnter = type => {
    console.log("state vehicle: " + type);
    type === "car"
      ? this.setState({ vehicle: "car", fee: 2000 })
      : this.setState({ vehicle: "motorcycle", fee: 1000 });

    this.setState({ clicked: 1 });
    this.renderParkingCalc();
    this.props.paymentPark(0, 0);
  };

  clickClose() {
    const { vehicle } = this.state;

    Swal.fire({
      title: `Parking ${vehicle} for ${this.props.parkDuration} hour${
        this.props.parkDuration > 1 ? "s" : ""
      }\n(Rp ${this.props.parkPayment})`,
      text: "Confirm payment?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then(result => {
      if (result.value) {
        this.props.paymentPark(0, 0);
        this.setState({ clicked: 0 });
        this.renderParkingCalc();

        Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1500,
          onOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        }).fire({
          text: "Your payment has been confirmed.",
          icon: "success"
        });
      }
    });
  }

  clickReset = () => {
    this.props.paymentPark(0, 0);
    this.refs.parking.value = "";
    this.setState({ clicked: 0 });
    this.renderParkingCalc();
  };

  btnPayment = (cash = 0) => {
    var time = this.refs.parking.value;

    this.state.vehicle === "car"
      ? this.props.paymentPark("car", time)
      : this.props.paymentPark("motorcycle", time);
  };

  renderParkingCalc = () => {
    if (this.state.clicked === 0) {
      return <p></p>;
    } else {
      console.log("state Payment: Rp " + this.props.parkPayment);
      console.log(
        "state Duration: " +
          this.props.parkDuration +
          `hr ${this.props.parkDuration > 1 ? "s" : ""}`
      );
      return (
        <div>
          <center>
            <p className="font-weight-bold mr-5 pr-3">
              Parking duration
              <input
                onChange={this.btnPayment}
                ref="parking"
                type="number"
                className="mx-2"
              />
              hour(s)
            </p>
          </center>
          <p className="mt-4">
            <span className="font-weight-bold">Parking Fee: </span>
            Rp {this.props.parkPayment},-
          </p>
          <input
            type="button"
            className="btn btn-warning"
            value="PAY"
            onClick={() => this.clickClose(this.state.clicked)}
          />
          <div>
            <input
              type="button"
              className="btn mt-3"
              value="reset"
              onClick={this.clickReset}
            />
          </div>
          <div
            style={{ position: "absolute", bottom: "0", right: "0", left: "0" }}
          >
            <p>
              *{this.state.vehicle}'s parking fee: Rp {this.state.fee},-/hour
            </p>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="mx-auto mt-5 mb-5">
          <h1>Parking</h1>
          <input
            type="button"
            className="btn btn-outline-primary mr-3 px-5"
            value="CAR"
            onClick={() => this.clickEnter("car")}
          />
          <input
            type="button"
            className="btn btn-outline-primary"
            value="MOTORCYCLE"
            onClick={() => this.clickEnter("motorcycle")}
          />
        </div>

        <div> {this.renderParkingCalc()} </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    parkDuration: state.parkingApp.duration,
    parkPayment: state.parkingApp.total
  };
};

export default connect(mapStateToProps, { paymentPark })(Parking);
