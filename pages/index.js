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

export default function Home() {
  const dispatch = useDispatch();
  const { categoryServiceList } = useSelector(
    (state) => state.categoryServiceList,
  );
  // const { isLoading } = useSelector((state) => state.applicationDetails);
  const router = useRouter();
  const [categoryServiceOptions, setCategoryServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  const handleContinue = (values) => {
    setIsLoader(true);
    if (selectedService.label === "Visa") {
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
              // dispatch(applicationDetailsFetchFailure());
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
              // dispatch(applicationDetailsFetchFailure());
            } else {
              toast.error("Application not found");
              setIsLoader(false);
              // dispatch(applicationDetailsFetchFailure());
            }
          },
        ),
      );
    } else {
      const details = {
        name: values.name,
        country: values.nationality.label,
        nationality: values.nationality.label,
        id_type: values.id_type.label,
        applicationId: values.id_number,
        id_number: values.id_number,
        serviceType: selectedService.label,
        category: selectedService.label,
      };
      dispatch(
        applicationDetailsFetchRequest(
          details,
          (success) => {
            if (success.data.category !== selectedService.label) {
              setIsLoader(false);
              toast.error("Application not found");
              // dispatch(applicationDetailsFetchFailure());
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
              // dispatch(applicationDetailsFetchFailure());
            } else {
              toast.error("Application not found");
              setIsLoader(false);
              // dispatch(applicationDetailsFetchFailure());
            }
          },
        ),
      );
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
      setSelectedService(obtainedList[0]);
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
        />
      </section>
    </>
  );
}
