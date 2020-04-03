<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="utf-8">

	<style>
		table,
		th,
		td {
			padding: 10px;
			border: 1px solid black;
			border-collapse: collapse;
		}
	</style>
</head>

<body>
	<h2 style="text-align: center;">Vos réservations</h2>

	<b>Cher spectateur,</b>

	<p>Merci pour vos réservations. Voici un récapitulatif de votre commande:</p>

	<table>
		<tr>
			<th>
				Spectacle
			</th>
			<th>
				Date
			</th>
			<th>
				Numéro de place
			</th>
			<th>
				Statut
			</th>
			<th>
				Prix
			</th>
		</tr>
		@foreach($reservations as $reservation)
		<tr>
			<td>
				{{ $reservation->table->plan->performance->name }}
			</td>
			<td>
				{{ $reservation->table->plan->performance->date }}
				{{-- {{ \Carbon\Carbon::parse($reservation->table->plan->performance->date)->format('d/m/Y')}} --}}

			</td>
			<td>
				{{ $reservation->seat_number }}
			</td>
			<td>
				@if ($reservation->status === 'confirmation_pending')
				{{ "En attente de réception du paiement" }}
				@endif
			</td>
			<td>
				{{-- {{ ((int)$reservation->price)/100 }} CHF --}}
				{{ number_format((float)$reservation->price/100, 2, '.', '') }} CHF
			</td>
		</tr>
		@endforeach
		<tr>
			<th colspan="4">
				Total
			</th>
			<th>
				<?php
					$total = 0;
					foreach ($reservations as $reservation) {
						if ($reservation['status'] === 'confirmation_pending') {
							$total += (int)$reservation['price'];
						}
					}
				?>
				{{ number_format((float)$total/100, 2, '.', '') }} CHF
			</th>
		</tr>
	</table>

	<br />

	<p>Vous pouvez à tout moment vérifier l'état de vos réservations dans votre <a
			href="theatre-la-parenthese.test/mon-panier">panier d'achat</a> (vous devez être connecté).</p>

	<div
		style="width: 30%; margin: 0 auto; text-align: center; line-height: 1.5em; center; padding: 20px; border: 1px solid #000; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
		<b>Théatre la parenthèse</b><br />
		Compte postal: <b>{{ env('MIX_POSTAL_ACCOUNT') }}</b><br />
		IBAN: <b>{{ env('MIX_IBAN') }}</b>
	</div>


	<p>Pour toute question relative à vos réservations, n'hésitez pas à nous contacter à l'adresse
		{{ env('MIX_EMAIL') }}.</p>

	<br />
	Avec nos meilleures salutations,<br />
	L'Équipe du {{ config('app.name') }}

</body>

</html>

{{-- @component('mail::message')
<h2>Votre réservation</h2>

Vos places ont bien été réservées.<br />
data: {{ $data }}<br />
Avec nos remerciements,<br>
{{ config('app.name') }}

@endcomponent --}}