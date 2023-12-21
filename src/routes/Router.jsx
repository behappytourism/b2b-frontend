// import B2BNotHotelPrivateRoute from "./B2BNotHotelPrivateRoute";
// import B2BNotVisaPrivateRoute from "./B2BNotVisaPrivateRoute";
// import B2BNotFlightPrivateRoute from "./B2BNotFlightPrivateRoute";
// import B2BNotA2aPrivateRoute from "./B2BNotA2aPrivateRoute";
// import B2BNotInsurancePrivateRoute from "./B2BNotInsurancePrivateRoute";
// import QuotationModule from "./modules/QuotationModule";
// import VisaModule from "./modules/VisaModule";
// import A2aModule from "./modules/A2aModule";
// import HotelModule from "./modules/HotelModule";
// import HotelErrorPage from "../b2b/pages/HotelApply/HotelErrorPage";
// const Dashboard = lazy(() => import("../b2b/pages/Dashboard"));

import { lazy } from "react";

import B2BMainLayout from "./B2BMainLayout";

import B2BPrivateRoute from "./B2BPrivateRoute";
import { AxiosInterceptor } from "../axios";

const PageNotFound = lazy(() => import("../b2b/pages/Errors/PageNotFound"));
const PaymentDecline = lazy(() => import("../b2b/pages/Errors/PaymentDecline"));
const Attraction = lazy(() => import("../b2b/pages/Attraction/Attraction"));
const AttractionDetails = lazy(() =>
  import("../b2b/pages/AttractionDetails/AttractionDetails")
);
const AttractionInvoice = lazy(() =>
  import("../b2b/pages/OrderInvoices/AttractionInvoice")
);
const B2BLoginPage = lazy(() => import("../b2b/pages/B2BLoginPage"));
const B2BRegisterPage = lazy(() => import("../b2b/pages/B2BRegisterPage"));
const EditResellers = lazy(() => import("../b2b/pages/Resllers/EditResellers"));
const AttractionOrder = lazy(() =>
  import("../b2b/pages/Order/AttractionOrder")
);
const MarkUpList = lazy(() => import("../b2b/pages/MarkUp/MarkUpList"));
const NewRegisters = lazy(() => import("../b2b/pages/Resllers/NewRegisters"));
const PaymentApproval = lazy(() =>
  import("../b2b/pages/PaymentApproval/PaymentApproval")
);
const PaymentHomePage = lazy(() =>
  import("../b2b/pages/AttractionPayment/PaymentHomePage")
);
const Resellers = lazy(() => import("../b2b/pages/Resllers/Resellers"));
const Settings = lazy(() => import("../b2b/pages/Settings/Settings"));
const SingleSubAgent = lazy(() =>
  import("../b2b/pages/Resllers/SingleSubAgent")
);
const VisaApplySuccessPage = lazy(() =>
  import("../b2b/pages/VisaApplyPage/VisaApplySuccessPage")
);
const VisaHomeScreen = lazy(() => import("../b2b/pages/Visa/VisaHomeScreen"));

const VisaIndex = lazy(() => import("../b2b/pages/VisaApplyPage/VisaIndex"));
const VisaMarkupList = lazy(() =>
  import("../b2b/pages/VisaMarkup/VisaMarkupList")
);
const VisaOrderDetailsPage = lazy(() =>
  import("../b2b/pages/VisaOrder/VisaOrderDetailsPage")
);
const VisaOrderPage = lazy(() =>
  import("../b2b/pages/VisaOrder/VisaOrderPage")
);
const Wallet = lazy(() => import("../b2b/pages/Wallet/Wallet"));
const ReapplyIndividual = lazy(() =>
  import("../b2b/pages/VisaOrder/ReapplyIndividual")
);
const PaymentSuccessPage = lazy(() =>
  import("../b2b/pages/PaymentApproval/PaymentSuccessPage")
);

const FlightHomePage = lazy(() => import("../b2b/pages/Flight/FlightHomePage"));
const FlightBookingPage = lazy(() =>
  import("../b2b/pages/Flight/FlightBookingPage")
);
const HotelIndexPage = lazy(() => import("../b2b/pages/Hotel/HotelIndexPage"));
const HotelDetailIndex = lazy(() =>
  import("../b2b/pages/HotelDetails/HotelDetailIndex")
);

const HotelApplyIndex = lazy(() =>
  import("../b2b/pages/HotelApply/HotelApplyIndex")
);
const A2ASelectionIndexPage = lazy(() =>
  import("../b2b/pages/a2aSelection/A2ASelectionIndexPage")
);
const A2ABookingIndexPage = lazy(() =>
  import("../b2b/pages/a2aBooking/A2ABookingIndexPage")
);
const A2AConfirmationPage = lazy(() =>
  import("../b2b/pages/a2aBooking/A2AConfirmationPage")
);
const A2AOrderPage = lazy(() => import("../b2b/pages/a2aOrder/A2AOrderPage"));
const A2AorderIndividualPage = lazy(() =>
  import("../b2b/pages/a2aOrder/A2AorderIndividualPage")
);
const AttractionPage = lazy(() => import("../b2b/pages/Home/AttractionPage"));
// const VisaPage = lazy(() => import("../b2b/pages/Home/VisaPage"));
// const FlightPage = lazy(() => import("../b2b/pages/Home/FlightPage"));
// const HotelPage = lazy(() => import("../b2b/pages/Home/HotelPage"));
// const A2aPage = lazy(() => import("../b2b/pages/Home/A2aPage"));
// const HotelOrder = lazy(() => import("../b2b/pages/HotelOrder/HotelOrder"));
// const HotelOrderDetailPage = lazy(() =>
//   import("../b2b/pages/HotelOrder/HotelOrderDetailPage")
// );
// const HotelSuccessPage = lazy(() =>
//   import("../b2b/pages/HotelApply/HotelSuccessPage")
// );
// const HotelMarkupList = lazy(() =>
//   import("../b2b/pages/HotelMarkup/HotelMarkupList")
// );
// const ConfirmationVoucher = lazy(() =>
//   import("../b2b/components/Hotel/ConfirmationVoucher")
// );

// const QuotationDashboardIndexpage = lazy(() =>
//   import(
//     "../b2b/pages/Quotation/QuotationDashboard/QuotationDashboardIndexpage"
//   )
// );
// const QuotationHomeIndex = lazy(() =>
//   import("../b2b/pages/Quotation/QuotationHome/QuotationHomeIndex")
// );
// const QuotationView = lazy(() =>
//   import("../b2b/pages/Quotation/QuotationDashboard/QuotationView")
// );
// const QuotationEmail = lazy(() =>
//   import("../b2b/pages/Quotation/QuotationDashboard/QuotationEmail")
// );
// const QuotationEditHomeIndex = lazy(() =>
//   import("../b2b/pages/Quotation/QuotationHome/QuotationEditHomeIndex")
// );
// const FlightConfirmation = lazy(() =>
//   import("../b2b/pages/Flight/FlightConfirmation")
// );
// ("../b2b/pages/PrivacyAndPolicy");
// const QuotationMarkupIndex = lazy(() =>
//   import("../b2b/pages/QuotationMarkup/QuotationMarkupIndex")
// );
// const InsurancePage = lazy(() => import("../b2b/pages/Home/InsurancePage"));
// const FlightBookingTicket = lazy(() =>
//   import("../b2b/pages/Flight/FlightBookingTicket")
// );
// const InsuranceOrderIndex = lazy(() =>
//   import("../b2b/pages/InsuranceOrder/InsuranceOrderIndex")
// );
// const InsuranceOrderViewPage = lazy(() =>
//   import("../b2b/pages/InsuranceOrder/InsuranceOrderViewPage")
// );
// const FlightOrderPage = lazy(() =>
//   import("../b2b/pages/Flight/FlightOrderPage")
// );
// const FlightOrderDetailPage = lazy(() =>
//   import("../b2b/pages/Flight/FlightOrderDetailPage")
// );
const PrivacyAndPolicy = lazy(() => import("../b2b/pages/PrivacyAndPolicy"));
const LandingPage = lazy(()=> import("../b2b/components/landingPage/LandingPage"))

const Transfer = lazy(()=>import("../b2b/pages/Home/TransferPage"))
const TransferListPage = lazy(()=>import("../b2b/pages/Transfer/TransferListPage"))
const CartPage = lazy(()=> import('../b2b/pages/Cart/Cartpage'))
const ToursHomePage = lazy(()=> import('../b2b/pages/Tours/ToursHomePage'))


import TransferDetailpage from "../b2b/pages/Transfer/TransferDetailpage";

import B2BNotAttractionPrivateRoute from "./B2BNotAttractionPrivateRoute";
import EntryDenied from "../b2b/components/features/EntryDenied";
import B2BNotQuotationPrivateRoute from "./B2BNotQuotationRoute";
import Demo from "../b2b/pages/Demo";
import AttractionModule from "./modules/AttractionModule";
import TransferModule from "./modules/TransferModule";
import GeneralModule from "./modules/GeneralModule";
import AboutUsPage from "../b2b/components/landingPage/AboutUsPage";
import ContactUsPage from "../b2b/components/landingPage/ContactUsPage";
import OrderSuccessPage from "../b2b/pages/Transfer/OrderSuccessPage";
import TransferOrderPage from "../b2b/pages/TransferOrder/TransferOrderPage";
import ViewSigleDetails from "../b2b/pages/TransferOrder/ViewSigleDetails";
import TourModule from "./modules/TourModule";


// const HotelErrorPage = lazy(() =>
//   import("../b2b/pages/HotelApply/HotelErrorPage")
// );

const ThemeRoutes = [
  {
    path: "",
    element: (
      <AxiosInterceptor>
        <B2BPrivateRoute>
          <B2BMainLayout />
        </B2BPrivateRoute>
      </AxiosInterceptor>
    ),
    children: [
      // {
      //   path: "/",
      //   element: <HotelModule />,
      //   children: [
      //     {
      //       path: "/",
      //       element: (
      //         <B2BNotHotelPrivateRoute>
      //           <HotelPage />
      //         </B2BNotHotelPrivateRoute>
      //       ),
      //     },
      //     { path: "/hotel/avail", element: <HotelIndexPage /> },
      //     { path: "/hotel/details/:id", element: <HotelDetailIndex /> },
      //     {
      //       path: "/hotel/:id/apply/:roomtypeid",
      //       element: <HotelApplyIndex />,
      //     },
      //     { path: "/hotel/order", element: <HotelOrder /> },
      //     {
      //       path: "/hotel/order/:id/details",
      //       element: <HotelOrderDetailPage />,
      //     },
      //     { path: "/hotel/invoice/:id", element: <HotelSuccessPage /> },
      //     { path: "/hotel/invoice/error", element: <HotelErrorPage /> },
      //   ],
      // },

      // {
      //   path: "/",
      //   element: <QuotationModule />,
      //   children: [
      //     {
      //       path: "/quotation",
      //       element: (
      //         <B2BNotQuotationPrivateRoute>
      //           <QuotationHomeIndex />
      //         </B2BNotQuotationPrivateRoute>
      //       ),
      //     },
      //     { path: "/quotation/list", element: <QuotationDashboardIndexpage /> },
      //     { path: "/quotation/view", element: <QuotationView /> },
      //     { path: "/quotation/email", element: <QuotationEmail /> },
      //     {
      //       path: "/quotation/list/edit/:amendment",
      //       element: <QuotationEditHomeIndex />,
      //     },
      //   ],
      // },
      {
        path: "/",
        element: <AttractionModule />,
        children: [
          {
            path: "/",
            element: (
              <B2BNotAttractionPrivateRoute>
                <AttractionPage />
              </B2BNotAttractionPrivateRoute>
            ),
          },
          { path: "/attractions/:slug", element: <Attraction /> },
          { path: "/attractions/details/:id", element: <AttractionDetails /> },
          { path: "/attractions/payment", element: <PaymentHomePage /> },
          // { path: "/attraction/order", element: <AttractionOrder /> },
          {
            path: "/attractions/invoice/:id",
            element: <AttractionInvoice />,
          },
          { path: "/payment/approval", element: <PaymentApproval /> },
        ],
      },
      // {
      //   path: "/",
      //   element: <VisaModule />,
      //   children: [
      //     {
      //       path: "/visa",
      //       element: (
      //         <B2BNotVisaPrivateRoute>
      //           <VisaPage />
      //         </B2BNotVisaPrivateRoute>
      //       ),
      //     },
      //     { path: "/visa/:id", element: <VisaHomeScreen /> },
      //     { path: "/visa/:id/apply", element: <VisaIndex /> },
      //     { path: "/visa/order", element: <VisaOrderPage /> },
      //     {
      //       path: "/visa/order/:id/details",
      //       element: <VisaOrderDetailsPage />,
      //     },
      //     {
      //       path: "/visa/order/:id/details/:passenger",
      //       element: <ReapplyIndividual />,
      //     },
      //     {
      //       path: "/visa/apply/invoice/:id",
      //       element: <VisaApplySuccessPage />,
      //     },
      //   ],
      // },
      // {
      //   path: "/",
      //   element: <A2aModule />,
      //   children: [
      //     {
      //       path: "/a2a",
      //       element: (
      //         <B2BNotA2aPrivateRoute>
      //           <A2aPage />
      //         </B2BNotA2aPrivateRoute>
      //       ),
      //     },
      //     { path: "/a2a/data", element: <A2ASelectionIndexPage /> },
      //     { path: "/a2a/booking/:id", element: <A2ABookingIndexPage /> },
      //     {
      //       path: "/a2a/booking/:id/confirm",
      //       element: <A2AConfirmationPage />,
      //     },
      //     { path: "/a2a/order", element: <A2AOrderPage /> },
      //     { path: "/a2a/order/:id", element: <A2AorderIndividualPage /> },
      //   ],
      // },
      {
        path:"/",
        element:<TransferModule/>,
        children:[
          {
            path: "/transfer",
            element: (
              <B2BNotQuotationPrivateRoute>
                <Transfer />
              </B2BNotQuotationPrivateRoute>
            ),
          },
          {
            path: '/transfer/list',
            element: (
              <TransferListPage/>
            )
          },
        
          // {
          //   path: '/transfer/details',
          //   element: (
          //     <TransferDetailpage/>
          //   )
          // },
          {
            path: '/transfer/invoice/:id',
            element: (
              <OrderSuccessPage/>
            )
          }
        ]
        
      },
      {
        path: "/",
        element: <TourModule/>,
        children: [
          {
            path: "/tours",
            element: (
              <ToursHomePage/>
            )
          }
        ]
      },
      {
        path: "/",
        element: <GeneralModule />,
        children: [
          // {
          //   path: "/flight",
          //   element: (
          //     <B2BNotFlightPrivateRoute>
          //       <FlightPage />
          //     </B2BNotFlightPrivateRoute>
          //   ),
          // },

          // {
          //   path: "/insurance",
          //   element: (
          //     <B2BNotInsurancePrivateRoute>
          //       <InsurancePage />
          //     </B2BNotInsurancePrivateRoute>
          //   ),
          // },
          
        
          { path: "/reseller/add", element: <NewRegisters /> },
          { path: "/resellers", element: <Resellers /> },
          { path: "/reseller/:id/edit", element: <EditResellers /> },
          { path: "/reseller/:id", element: <SingleSubAgent /> },

          { path: "/markup/attraction", element: <MarkUpList /> },
          // { path: "/markup/visa", element: <VisaMarkupList /> },
          // { path: "/markup/hotel", element: <HotelMarkupList /> },
          // { path: "/markup/quotation", element: <QuotationMarkupIndex /> },
          { path: "/settings", element: <Settings /> },

          { path: "/wallet", element: <Wallet /> },

          {path: "/home/cart", element: <CartPage/>},
          {
            path: '/order',
            element: (
              <TransferOrderPage/>
            )
          },
          {
            path: "/order/details/:id",
            element: (
              <ViewSigleDetails/>
            )
          },


          // { path: "/flight/order/results", element: <FlightHomePage /> },
          // { path: "/b2b/flight/:tbId", element: <FlightBookingPage /> },
          // {
          //   path: "/b2b/flight/ticket/booking/:bookingId",
          //   element: <FlightBookingTicket />,
          // },
          // { path: "/flight/order", element: <FlightOrderPage /> },
          // {
          //   path: "/b2b/flight/order/details/:bookingId",
          //   element: <FlightOrderDetailPage />,
          // },

          // { path: "/insurance/order", element: <InsuranceOrderIndex /> },
          // {
          //   path: "/insurance/order/orderView/:id",
          //   element: <InsuranceOrderViewPage />,
          // },
          {
            path: "/*",
            element: <PageNotFound />,
          },
          {
            path: "/error",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <B2BLoginPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyAndPolicy />,
  },
  {
    path: "/register",
    element: <B2BRegisterPage />,
  },
  {
    path: "/entrydenied",
    element: <EntryDenied />,
  },
  {
    path: "/payment-decline",
    element: <PaymentDecline />,
  },
  {
    path: "/b2b/wallet/deposit/:id/cancelled",
    element: <PaymentDecline />,
  },
  {
    path: "/b2b/wallet/deposit/:id/success",
    element: <PaymentSuccessPage />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  // {
  //   path:"/landingpageb2b",
  //   element:<LandingPage/>
  // },
  // {
  //   path:"/aboutus",
  //   element:<AboutUsPage/>
  // },
  {
    path:"/contactusb2b",
    element:<ContactUsPage/>
  },
 

];

export default ThemeRoutes;
