import React from "react";
import { SpinnerProps } from "./types";
import { LoadingView } from "./styles";

const LoadingSpinner = (props: SpinnerProps) => <LoadingView {...props} />;

export default LoadingSpinner;