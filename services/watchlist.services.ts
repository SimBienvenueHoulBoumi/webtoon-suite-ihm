"use server";

import { WatchList } from "@/types/watchlist";
import { cookies } from "next/headers";

/**
 * Récupère l'en-tête d'authentification avec le token d'accès.
 * @returns {Promise<{ Authorization: string }>} L'en-tête d'authentification.
 */
const getAuthHeader = async () => {
  const token = (await cookies()).get("access_token")?.value;
  return { Authorization: token ? `Bearer ${token}` : "" };
};

/**
 * Crée une watchlist et y ajoute un contenu.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @param {number} contentId - L'identifiant du contenu à ajouter.
 * @returns {Promise<Watchlist | null>} Résultat de l'opération.
 */
export const createWatchlist = async (
  title: string,
  type: string,
  currentEp: number,
  currentChap: number
): Promise<
  | {
      success: boolean;
      data: WatchList;
      message?: undefined;
    }
  | {
      success: boolean;
      message: string;
      data?: undefined;
    }
> => {
  try {
    // 1️⃣ Création de la watchlist
    const watchlistResponse = await fetch(`${process.env.API_HOST}/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(await getAuthHeader()),
      },
      body: JSON.stringify({ title, type, currentEp, currentChap }),
    });

    if (!watchlistResponse.ok) {
      throw new Error("Erreur lors de la création de la watchlist");
    }

    return watchlistResponse.json();
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

/**
 * Récupère la watchlist d'un utilisateur.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<{ success: boolean, data?: any, message?: string }>} La watchlist ou une erreur.
 */
export const getWatchlist = async (
  page: number
): Promise<
  | {
      success: boolean;
      data: WatchList[];
      message?: undefined;
    }
  | {
      success: boolean;
      message: string;
      data?: undefined;
    }
> => {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/watchlist/?page=${page}&limit=10`,
      {
        headers: await getAuthHeader(),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la watchlist");
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};


/**
 * Mettre de jour une watchlist
 * @param
 * 
 */
