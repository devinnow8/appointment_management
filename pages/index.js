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
import { appointmentDetailsFetchFailure } from "../redux/reducer/appointment-details";
import { appointmentScheduleFetchFailure } from "../redux/reducer/appointment";
import { confirmOrderFetchFailure } from "../redux/reducer/order-conformation";

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
      if (selectedService.label.toLowerCase().includes("visa")) {
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
        details.phone_number = values.phone;
      }
      dispatch(
        applicationDetailsFetchRequest(
          details,
          (success) => {
            if (
              !selectedService.label.toLowerCase().includes("visa") &&
              success.data.category !== selectedService.label
            ) {
              setIsLoader(false);
              toast.error("Application not found");
            } else if (
              selectedService.label.toLowerCase().includes("visa") &&
              !success.data.category.toLowerCase().includes("visa")
            ) {
              setIsLoader(false);
              toast.error("Application not found");
            } else {
              const tempArray = [];
              tempArray.push(success.data);
              dispatch(applicationDetailsFetchMemberSuccess(tempArray));
              dispatch(applicationDetailsFetchSuccess(success.data));
              if (success.data.status === "Cancel") {
                toast.error("This application is Cancelled");
                setIsLoader(false);
              } else if (
                success.data.appointmentId &&
                (success.data.status === "Reschedule" ||
                  success.data.status === "Pending")
              ) {
                router.push({
                  pathname: "/reschedule-appointment",
                });
              } else if (
                success.data.appointmentId &&
                success.data.status === "Complete"
              ) {
                toast.warn("This application is already completed");
                setIsLoader(false);
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
        dispatch(
          appointmentBookedDetailsRequest(
            values,
            (success) => {
              if (success.data.status === "Cancel") {
                toast.error("This Application is Cancelled");
                setIsLoader(false);
              } else if (success.data.status === "Complete") {
                toast.warn("This application is Completed");
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
        // return {
        //   ...service,
        //   value:
        //     service?.value.charAt(0).toUpperCase() + service?.value.slice(1),
        //   label:
        //     service?.value.charAt(0).toUpperCase() + service?.value.slice(1),
        //   enable: service.enable,
        // };
        return {
          ...service,
          value: service?.value,
          label: service?.value,
          enable: service.enable,
        };
      });
      const filteredArray = obtainedList.filter((item) => {
        return item.enable === true;
      });
      setCategoryServiceOptions(filteredArray);
      let defaultSelectedService = filteredArray[0];
      const item = obtainedList.find((item) =>
        item.label.toLowerCase().includes("visa"),
      );
      if (item) defaultSelectedService = defaultSelectedService;
      setSelectedService(item);
    }
  }, [categoryServiceList]);

  useEffect(() => {
    dispatch(appointmentDetailsFetchFailure());
    dispatch(appointmentScheduleFetchFailure());
    dispatch(confirmOrderFetchFailure());
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
          setAppointment={setAppointment}
          appointment={appointment}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      </section>
    </>
  );
}
