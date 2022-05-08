import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

export default function Failure() {
	const location = useLocation();

	const params = location.search
		.slice(1)
		.split("&")
		.map((el) => el.split("="));

	const {
		collection_id,
		collection_status,
		payment_id,
		status,
		external_reference,
		payment_type,
		merchant_order_id,
		preference_id,
		site_id,
		processing_mode,
		merchant_account_id,
	} = Object.fromEntries(params);

	return (
		<div>
			<div>
				<img
					src="https://padasystem.com.ar/wp-content/uploads/2019/04/pagorec.jpg"
					alt="img not found"
					with="300px"
					height="350px"
				></img>
			</div>
			<div>
				<h3>Collection Id</h3>
				<p>${collection_id}</p>
			</div>

			<div>
				<h3>Collection Status</h3>
				<p>${collection_status}</p>
			</div>

			<div>
				<h3>Payment Id</h3>
				<p>${payment_id}</p>
			</div>

			<div>
				<h3>Status :</h3>
				<p>${status}</p>
			</div>

			<div>
				<h3>External Reference</h3>
				<p>${external_reference}</p>
			</div>

			<div>
				<h3>Payment Type</h3>
				<p>${payment_type}</p>
			</div>

			<div>
				<h3>Merchant Order Id</h3>
				<p>${merchant_order_id}</p>
			</div>

			<div>
				<h3>Preference Id</h3>
				<p>${preference_id}</p>
			</div>

			<div>
				<h3>Site Id</h3>
				<p>${site_id}</p>
			</div>

			<div>
				<h3>Processing Mode</h3>
				<p>${processing_mode}</p>
			</div>

			<div>
				<h3>Merchant Account Id</h3>
				<p>${merchant_account_id}</p>
			</div>
		</div>
	);
}

/* // collection_id=1247974602
  // collection_status=rejected
  // payment_id=1247974602
  // status=rejected
  // external_reference=null
  // payment_type=credit_card
  // merchant_order_id=4705177212
  // preference_id=1118819873-f3358ec6-ea85-4867-85a0-b733c3376f3d
  // site_id=MLA
  // processing_mode=aggregator
  // merchant_account_id=null */
