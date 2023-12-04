import { useEffect } from "react";
import CustomNavbar from "../navbar";
import { useDispatch } from "react-redux";
import { connectWallet } from "@/store/auth/authSlice";
import { roboto } from "@/ui/fonts";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWallet());
  }, []);

  return (
    <main className={` dark text-foreground bg-background`}>
      <CustomNavbar />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </div>
    </main>
  );
};

export default Layout;
