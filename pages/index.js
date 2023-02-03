import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getUserAppointment } from "../redux/action/index";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchSuccess,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
import { categoryServiceListFetchRequest } from "../redux/reducer/category-service";
import { toast } from "react-toastify";
import ApplicationForm from "../components/home/application-form";

export default function Home() {
  const dispatch = useDispatch();
  const { categoryServiceList } = useSelector(
    (state) => state.categoryServiceList,
  );
  const router = useRouter();
  const [categoryServiceOptions, setCategoryServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const handleContinue = (values) => {
    setIsLoader(true);
    const obj = {
      selectedService: selectedService,
      appointmentDetails: values,
    };
    dispatch(getUserAppointment(obj));
    const details = {
      applicationId: values.application_id,
      dob: values.dob,
      serviceType: selectedService.label,
    };
    dispatch(
      applicationDetailsFetchRequest(
        details,
        (success) => {
          if (success.data.category !== selectedService.label) {
            setIsLoader(false);
            toast.error("Application not found");
          } else {
            const tempArray = [];
            tempArray.push(success.data);
            dispatch(applicationDetailsFetchMemberSuccess(tempArray));
            dispatch(applicationDetailsFetchSuccess(success.data));
            if (success.status === 200) {
              router.push({
                pathname: "/book-appointment",
                query: { selectedService: selectedService.label },
              });
              setIsLoader(false);
            }
          }
        },
        (error) => {
          setIsLoader(false);
          if (error.message.includes("Network Error")) {
            toast.error(error.message);
          } else {
            toast.error("Application not found");
          }
        },
      ),
    );
  };

  useEffect(() => {
    dispatch(categoryServiceListFetchRequest());
    const obtainedList = categoryServiceList.map((service) => {
      return {
        value:
          service?.categoryName.charAt(0).toUpperCase() +
          service?.categoryName.slice(1),
        label:
          service?.categoryName.charAt(0).toUpperCase() +
          service?.categoryName.slice(1),
      };
    });
    setCategoryServiceOptions(obtainedList);
    setSelectedService(obtainedList[0])
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="appointment-form">
        <ApplicationForm
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          categoryServiceOptions={categoryServiceOptions}
          handleContinue={handleContinue}
          isLoader={isLoader}
        />
      </section>
    </>
  );
}
