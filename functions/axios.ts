import { baseURL } from "@/constant/statics";
import axios from "axios";

export const getAllSportsDashboardData = async (page: number, limit = 5) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/dashboard/sports?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getAllMembers = async (page: number, limit = 5) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/api/dashboard/members?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getAllSubscriptions = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/api/dashboard/subscriptions`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const getDashboardData = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/api/dashboard`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return null;
  }
};
