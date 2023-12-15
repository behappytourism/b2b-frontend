import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { companyLogo, logoPng } from "../../../static/imagesB2B";
import { config } from "../../../constants";

function ConfirmationVoucher() {
  return (
    <div className="section-voucher border">
      <div className="image-container">
        <img src={companyLogo} alt="logo" className="logo-image" />
      </div>
      <h1 className="">CONFIRMATION VOUCHER</h1>
      <div className="main-container">
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td className="left-tr">NAME OF THE PASSENGER</td>
                <td>MR.SAM PHILIPIE</td>
              </tr>
              <tr>
                <td className="left-tr">TOTAL NO. OF PAX</td>
                <td>04 ADULTS 1 CHILD</td>
              </tr>
              <tr>
                <td className="left-tr">NAME OF HOTEL / APARTMENTS</td>
                <td>Omega Hotel Bur Dubai</td>
              </tr>
              <tr>
                <td className="left-tr">CONFIRMATION NUMBER</td>
                <td>52068</td>
              </tr>
              <tr>
                <td className="left-tr">TOTAL REF NO</td>
                <td>KASMAY0222</td>
              </tr>
              <tr>
                <td className="left-tr">CHECK IN DATE </td>
                <td>15-05-2023</td>
              </tr>
              <tr>
                <td className="left-tr"> NOTE</td>
                <td>
                  Standard Check in Time is 1500 hrs (except at Atlantis the
                  Palm). Early check in is subject to being booked in advance or
                  as per hotel availability & in this case, may charge directly
                  to the guest.
                </td>
              </tr>
              <tr>
                <td className="left-tr">CHECK OUT DATE</td>
                <td>20-05-2023</td>
              </tr>
              <tr>
                <td className="left-tr">NOTE</td>
                <td>
                  (Standard Check Out Time:12.00) Late checkout subject to hotel
                  availability & hotel may charge directly to the guest.
                </td>
              </tr>
              <tr>
                <td className="left-tr">ROOM DETAILS</td>
                <td>#</td>
              </tr>
              <tr>
                <td className="left-tr">NO OF ROOMS</td>
                <td>#</td>
              </tr>
              <tr>
                <td className="left-tr">DAILY BUFFET BREAKFAST</td>
                <td>At Hotel</td>
              </tr>
              <tr>
                <td className="left-tr">BASIS OF TRANSFER</td>
                <td>PVT</td>
              </tr>
              <tr className="border-thicker">
                <td className="left-tr">ARRIVAL DUBAI AIRPORT TRANSFER</td>
                <td>
                  Guests need to proceed to the Exit Gate & look the Name
                  of....... Mr.Sam Philipie
                </td>
              </tr>
              <tr className="">
                <td colSpan={2}>
                  <ul className="contact-list">
                    <li>EMERGENCY CONTACT NO.</li>
                    <li>
                      Mr. Atif / Mr. Kashif Jamal +971 566807610 / +971
                      523413561
                    </li>
                  </ul>
                </td>
              </tr>
              <tr className="border-thicker">
                <td colSpan={2}>
                  <p className="">
                    Note:The maximum waiting period for a driver, for an arrival
                    transfer would be Forty Five Minutes after the flight lands.
                    If the guest does not inform the driver in the given waiting
                    period our driver will move from the airport. It is thus
                    important to share the guests contact details in advance
                  </p>
                </td>
              </tr>
              <tr>
                <td className="left-tr">ARRIVAL AT</td>
                <td># EK 565 15 MAY 12:45 PM Dubai Airport T-3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="second-page main-container ">
        <table>
          <thead>
            <tr>
              <th className="td-rt">#</th>
              <th className="td-rt">TOUR SCHEDULE</th>
              <th className="td-rt">DATE</th>
              <th className="td-rt">PICK FROM</th>
              <th>PICK UP TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-rt">1</td>
              <td className="td-rt widthfourty">
                Arrival from Dubai Airport + Lunch at an Indian Restaurant/Hotel
                with a Transfer & drop off to Omega Hotel Bur Dubai
              </td>
              <td className="td-rt">15-May-2023</td>
              <td className="td-rt">Dubai Airport T-3</td>
              <td>12:45 PM - 12:45 PM</td>
            </tr>
            <tr>
              <td className="td-rt">1</td>
              <td className="td-rt widthfourty">
                Arrival from Dubai Airport + Lunch at an Indian Restaurant/Hotel
                with a Transfer & drop off to Omega Hotel Bur Dubai
              </td>
              <td className="td-rt">15-May-2023</td>
              <td className="td-rt">Dubai Airport T-3</td>
              <td>12:45 PM - 12:45 PM</td>
            </tr>
            <tr>
              <td className="td-rt">1</td>
              <td className="td-rt widthfourty">
                Arrival from Dubai Airport + Lunch at an Indian Restaurant/Hotel
                with a Transfer & drop off to Omega Hotel Bur Dubai
              </td>
              <td className="td-rt">15-May-2023</td>
              <td className="td-rt">Dubai Airport T-3</td>
              <td>12:45 PM - 12:45 PM</td>
            </tr>
            <tr>
              <td colSpan={2} className="td-rt">
                DEPARTURE AT{" "}
              </td>
              <td colSpan={3}># EK 566 20 MAY 01:45 PM Dubai Airport T-3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <hr />
      <hr />
      <div className="last-container">
        <p className="first-last">
          Conditions:We at the{config.TITLE_NAME} will not be able to entertain
          any last moment changes, any changes in tour date or timing must be
          informed 24 hours prior to the given timing otherwise guest will be
          considered as a no show. Changes inTours will be subject to
          availability. Please note that the given timing for tour(s) pickups
          are approximate and guest are required to inform their presence Lobby
          to hotel concierge. Our tour guide will not be able wait for more than
          10 minutes for pickup at the Hotel. Please note that if guests are
          late to reach the location between the above given timing then also,
          guest will be Considered no show.
        </p>
        <ul>
          <li>
            {" "}
            Tourism Dirham fees has to be paid by the Guest directly upon check
            in at the hotel, if not already paid byYourTravel Agent / Company in
            Advance
          </li>
          <li>
            Rooms & Rates are Subject to Availability at the time of booking &
            Standard Check IN Time is 03:00 PM & Early check in is subject to
            being booked in advance or as per hotel availability & in this case,
            may charge directly to the guest.
          </li>
          <li>
            It is important to note that 4 star & 5 star hotels generally
            collect security deposit of approx. USD 100 directly from the guest
            at the time of check in, which is then refunded at the time of check
            out.
          </li>
          <li>
            Kindly provide prior information ofVeg & Non-Veg meals for Group or
            FIT.
          </li>
          <li> At All Dhow</li>
        </ul>
      </div>
    </div>
  );
}

export default ConfirmationVoucher;
