import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import NavigationBar from '../Shared/Navbar/NavigationBar';


const Layout = () => {

const location = useLocation();
const noHeaderFooter =
 location.pathname.includes('dp') || 
 location.pathname.includes('adminlogin') ||
 location.pathname.includes('deliverymanPanel') ||
 location.pathname.includes('deliveryAssignList') ||
 location.pathname.includes('adminCategory') ||
 location.pathname.includes('adminategoryAdd') ||
 location.pathname.includes('adminCategoryEdit') ||
 location.pathname.includes('adminSubCategory') ||
 location.pathname.includes('adminSubCategoryEdit') ||
 location.pathname.includes('adminSubCategoryAdd') ||
 location.pathname.includes('adminFoodItem') ||
 location.pathname.includes('adminFoodItemEdit') ||
 location.pathname.includes('adminFoodItemAdd') ||
 location.pathname.includes('adminPackageList') ||
 location.pathname.includes('adminPackageEdit') ||
 location.pathname.includes('adminPackageAdd') ||
 location.pathname.includes('adminOrderList') ||
 location.pathname.includes('adminOrderDetails') ||
 location.pathname.includes('adminOrderProcessing') ||
 location.pathname.includes('invoice') ||
 location.pathname.includes('adminOrderDelivery') ||
 location.pathname.includes('adminReservationList') ||
 location.pathname.includes('adminReservationApprovedList') ||
 location.pathname.includes('adminEmployeeList') ||
 location.pathname.includes('adminEmployeeEdit') ||
 location.pathname.includes('adminEmployeeDetails') ||
 location.pathname.includes('adminEmployeeAdd') ||
 location.pathname.includes('adminDeliveryManList') ||
 location.pathname.includes('adminDeliveryManEdit') ||
 location.pathname.includes('adminDeliveryManAdd') ||
 location.pathname.includes('createDeliveryPanel') ||
 location.pathname.includes('adminPressList') ||
 location.pathname.includes('adminPressEdit') ||
 location.pathname.includes('adminpressAdd') 

    return (
        <div>
        { noHeaderFooter || <NavigationBar/> }
        <Outlet/>
        { noHeaderFooter || <Footer/> }
        </div>
    );
};

export default Layout;
