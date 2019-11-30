import React, { Component } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { parkingPayment, parkingTime } from "../redux/actions";

class Parking extends Component {
  state = {
    clicked: 0,
    vehicle: "",
    fee: 0
  };

  clickEnter = type => {
    console.log(type);
    type === "car"
      ? this.setState({ vehicle: "car", fee: 2000 })
      : this.setState({ vehicle: "motorcycle", fee: 1000 });
    this.setState({ clicked: 1 });
    this.renderParkingCalc();
  };

  clickClose() {
    const { vehicle } = this.state;
    Swal.fire({
      title: `Parking ${vehicle} for ${this.props.Duration} hour${
        this.props.Duration > 1 ? "(s)" : ""
      }\n(Rp ${this.props.Payment})`,
      text: "Confirm payment?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then(result => {
      if (result.value) {
        this.props.parkingPayment(0);
        this.props.parkingTime(0);
        this.setState({ clicked: 0 });
        this.renderParkingCalc();
      }
      Swal.fire({
        text: "Your payment has been confirmed.",
        icon: "success",
        showConfirmButton: false,
        timer: 1200
      });
    });
  }

  clickReset = () => {
    this.props.parkingPayment(0);
    this.props.parkingTime(0);
    this.setState({ clicked: 0 });
    this.renderParkingCalc();
  };

  btnPayment = (cash = 0) => {
    var time = this.refs.parking.value;
    this.state.vehicle === "car" ? (cash = time * 2000) : (cash = time * 1000);

    this.props.parkingPayment(cash);
    this.props.parkingTime(time);
  };

  renderParkingCalc = () => {
    if (this.state.clicked === 0) {
      return <p></p>;
    } else {
      console.log("state Payment: " + this.props.Payment);
      console.log("state Duration: " + this.props.Duration);
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
            Rp {this.props.Payment},00
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
              *{this.state.vehicle}'s parking fee: {this.state.fee}/hour
            </p>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="mx-auto mb-5">
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
    Payment: state.payment.parkingFee,
    Duration: state.duration.parkingDuration
  };
};

export default connect(mapStateToProps, {
  parkingPayment,
  parkingTime
})(Parking);
