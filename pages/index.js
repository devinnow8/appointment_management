import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import {
  applicationDetailsFetchRequest,
  applicationDetailsFetchSuccess,
  applicationDetailsFetchMemberSuccess,
} from "../redux/reducer/application-detail";
import { categoryServiceListFetchRequest } from "../redux/reducer/category-service";
import { toast } from "react-toastify";
import ApplicationForm from "../components/home/application-form";
import { appointmentBookedDetailsRequest } from "../redux/reducer/appointment-booked";
import { arrayTabs } from "../constants";

export default function Home() {
  const dispatch = useDispatch();
  const { categoryServiceList } = useSelector(
    (state) => state.categoryServiceList,
  );
  const router = useRouter();
  const [categoryServiceOptions, setCategoryServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [appointment, setAppointment] = useState(arrayTabs[0]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContinue = (values) => {
    if (appointment === "New Appointment") {
      setIsLoader(true);
      const details = {};
      if (selectedService.label === "Visa") {
        details.applicationId = values.application_id;
        details.dob = values.dob;
        details.serviceType = selectedService.label;
      } else {
        details.name = values.name;
        details.country = values.nationality.label;
        details.serviceType = selectedService.label;
        details.nationality = values.nationality.label;
        details.id_type = values.id_type.label;
        details.applicationId = values.id_number;
        details.id_number = values.id_number;
        details.category = selectedService.label;
        details.email = values.email;
        details.phone_number = parseInt(values.phone);
      }
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
              if (success.data.appointmentId) {
                router.push({
                  pathname: "/reschedule-appointment",
                });
              } else {
                if (success.status === 200) {
                  router.push({
                    pathname: "/book-appointment",
                    query: { selectedService: selectedService.label },
                  });
                }
              }
            }
          },
          (error) => {
            if (error.message.includes("Network Error")) {
              toast.error(error.message);
              setIsLoader(false);
            } else {
              toast.error("Application not found");
              setIsLoader(false);
            }
          },
        ),
      );
    } else {
      if (values === "") {
        setErrorMsg("Required");
      } else {
        setIsLoader(true);
        setErrorMsg("");
        console.log(values, "success=>");
        dispatch(
          appointmentBookedDetailsRequest(
            values,
            (success) => {
              console.log(success, "success=>");
              if (success.data.status === "Cancel") {
                console.log("successdata", success.data);
                toast.error("This Application is Cancelled");
                setIsLoader(false);
              } else {
                if (success.data.appointmentId) {
                  const tempArray = [];
                  tempArray.push(success.data);
                  dispatch(applicationDetailsFetchMemberSuccess(tempArray));
                  dispatch(applicationDetailsFetchSuccess(success.data));
                  router.push({
                    pathname: "/reschedule-appointment",
                  });
                }
              }
            },
            (error) => {
              console.log(error, "error==>");
              toast.error("Application not found");
              setIsLoader(false);
            },
          ),
        );
      }
    }
  };

  useEffect(() => {
    dispatch(categoryServiceListFetchRequest());
  }, []);

  useEffect(() => {
    if (categoryServiceList.length > 0) {
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
      let defaultSelectedService = obtainedList[0];
      const item = obtainedList.find(
        (item) => item.label.toLowerCase() === "visa",
      );
      if (item) defaultSelectedService = defaultSelectedService;
      setSelectedService(item);
    }
  }, [categoryServiceList]);

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
          setAppointment={setAppointment}
          appointment={appointment}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      </section>
    </>
  );
}
