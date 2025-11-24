import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
    role: string;
    name: string;
    email: string;
    password: string;
    otpToken: string;
}

const initalState : State = {
    role: "",
    name: "",
    email: "",
    password: "",
    otpToken: "",
};

interface Actions{
    setOtpDetails: (data: any)=> void
    clearOtpDetails : ()=> void
}

const useOtpStore = create<Actions & State>()(
    devtools(
        persist(
            (set) => ({
                ...initalState,
                setOtpDetails: (data) => set(() => ({
                    role: data.role,
                    name: data.name,
                    email: data.email,
                    otpToken: data.otpToken,
                    password: data.password,
                })),
                clearOtpDetails: () => set(() => ({
                    ...initalState,
                })),
            }),
            {
                name: "otp-storage", // unique name
                version: 1,
            }
        )
    )
);

export default useOtpStore;