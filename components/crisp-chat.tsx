"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!);
	}, []);

	return null;
};
