import React, { Component } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { paymentPark } from "../redux/actions";

class Parking extends Component {
  state = {
    clicked: 0, // state untuk membuka renderParkingCalc
    vehicle: "",
    fee: 0 // state untuk keterangan harga di bawah halaman
  };

  // Mengganti title website
  componentDidMount() {
    document.title = "Parking-app";
  }

  // Function untuk Btn memilih CAR atau MOTORCYCLE
  clickEnter = type => {
    console.log("state vehicle: " + type);
    type === "car"
      ? // update state untuk mode CAR
        this.setState({ vehicle: "car", fee: 2000 })
      : // update state untuk mode MOTORCYCLE
        this.setState({ vehicle: "motorcycle", fee: 1000 });

    // untuk membuka menu parkir sesuai isi state
    this.setState({ clicked: 1 });

    // menjalankan menu parkir
    this.renderParkingCalc();

    // me-reset menu parkir sebelumnya
    this.props.paymentPark(0, 0);
  };

  // function untuk menjalankan onChange di input renderParkingCalc()
  btnPayment = (cash = 0) => {
    // variabel yg menyimpan value yang diisi pada input
    var time = this.refs.parking.value;

    // If ternary yan
    this.state.vehicle === "car"
      ? this.props.paymentPark("car", time)
      : this.props.paymentPark("motorcycle", time);
  };

  // Button untuk melakukan pembayaran
  clickPay() {
    // Destructuring vehicle dalam state biar lebih ringkas
    const { vehicle } = this.state;

    // Menjalankan SweetAlert confirmation
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
      // Kalau klik confirmed, akan menjalankan SweetAlert
      if (result.value) {
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

        // setelah menjalankan SweetAlert, seluruh state di reset
        this.props.paymentPark(0, 0);
        this.setState({ clicked: 0 });

        // kemudian menjalankan render kembali dengan INITIAL_STATE
        this.renderParkingCalc();
      }
    });
  }

  // Button reset
  clickReset = () => {
    this.props.paymentPark(0, 0);
    this.refs.parking.value = "";
    this.setState({ clicked: 0 });
    this.renderParkingCalc();
  };

  // Render menu parkir
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
                onChange={this.btnPayment} // ===> lokasi function
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
            onClick={() => this.clickPay(this.state.clicked)}
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
  s;
}

/* ==== untuk memanggil reducer
        agar bisa digunakan di dalam Parking.jsx ==== */
const mapStateToProps = state => {
  return {
    /* ==== menggunakan value dalam properti duration milik objek
            parkingState di file parkingReducers.js */
    parkDuration: state.parkingState.duration,

    /* ==== menggunakan value dalam properti total milik objek 
            parkingState di file parkingReducers.js */
    parkPayment: state.parkingState.total
  };
};

export default connect(mapStateToProps, { paymentPark })(Parking);
