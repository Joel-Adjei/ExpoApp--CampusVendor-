import { create } from "zustand";
import { defaultAdmin, defaultVendor } from "../lib/data";

interface initialState {
    users: any[];
    vendors: any[];
    admins: any[];
    user: {
        email: string;
        name: string;
        role: string;
    };
    vendorInfo: any;
    role: string; 
    name: string;
    email: string;
    password: string;
    description: string;
    businessName: string;
    phoneNumber: string;
    location: string;
    isLogin: boolean;
    status: string;
    token: string;
}

const initialValue :initialState = {
    users: [],
    vendors: [defaultVendor],
    admins: [defaultAdmin],
    user: {
        email: "",
        name: "",
        role: "",
    },
    vendorInfo: null,
    role: "",
    name: "",
    email: "",
    password: "",
    description: "",
    businessName: "",
    phoneNumber: "",
    location: "",
    isLogin: false,
    status: "",
    token: "",
}

interface Actions {
    signUpUser: (data: any) => void;
    signUpVendor: (data: any) => void;
    updateLogin: (data: any) => void;
    updateLogout: () => void;
    updateVendor: (data: any) => void;
    updateName: (data: any) => void;
    updateDescrip: (data: any) => void;
    updateRole: (data: any) => void;
    updateToken: (data: any) => void;
    updateUser: (data: any) => void;
}

const useAuthStore = create<initialState& Actions>(
    (set) => ({
        ...initialValue,
        signUpUser: (data) => set((state) => ({ users: [...state.users, data] })),
        signUpVendor: (data) => set((state) => ({ vendors: [...state.vendors, data] })),
        updateLogin: (data) => set(() => ({ isLogin: true, email: data.email, password: data.password })),
        updateVendor: (data) => set(() => ({
            role: data.role,
            name: data.name,
            email: data.email,
            description: data.description,
            phoneNumber: data.phoneNumber,
            businessName: data.businessName,
            location: data.location,
            status: data.status,
        })),
        updateLogout: () => set((state) => ({ ...initialValue, users: state.users, vendors: state.vendors, admins: state.admins })),
        updateName: (data) => set(() => ({ name: data.name })),
        updateDescrip: (data) => set(() => ({ name: data.description })),
        updateRole: (data) => set(() => ({ role: data })),
        updateToken: (data) => set(() => ({ token: data })),
        updateUser: (data) => set(() => ({ user: data })),
    }),
)

export default useAuthStore;