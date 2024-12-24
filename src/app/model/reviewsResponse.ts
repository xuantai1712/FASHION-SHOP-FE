import { Reviews } from "./reviews";

export interface ReviewsResponse {
    reviews: Reviews[];
    totalPages: number;
  }