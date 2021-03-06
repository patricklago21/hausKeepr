$(function () {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let hh = String(today.getHours()).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  $("#appointment_date").datepicker({
    minDate: 1,
    defaultDate: today
  });
  $('.timepicker').timepicker({
      timeFormat: 'h:mm p',
      interval: 60,
      minTime: '8',
      maxTime: '20',
      defaultTime: hh,
      startTime: '8',
      dynamic: true,
      dropdown: true,
      scrollbar: true
  });
});

async function notifyHausKeepr(hauskeepr_id) {
  // const response = await fetch("/api/contact", {
  //     method: "POST",
  //     body: JSON.stringify({ 
  //       hauskeepr_email: hauskeepr.email,
  //       client_email: window.sessionStorage.getItem('email'),
  //       hauskeepr_username: hauskeepr.username
  //     }),
  //     headers: {
  //         "Content-Type": "application/json"
  //     }
  // });

  // if (response.ok) {
  //   // document.location.reload();
  // } else {
  //   alert ("Something went wrong");
  // }

}

async function appointmentFormHandler(event) {
  event.preventDefault();

  const appointment_date = document.querySelector('input[name="appointment_date"]').value.trim();
  const appointment_time = document.querySelector('input[name="appointment_time"]').value.trim();
  const hours = document.querySelector('input[name="appointment_hours"]').value.trim();
  const total_cost = document.querySelector('input[name="appointment_cost"]').value.trim();
  const notes = document.querySelector('input[name="appointment_notes"]').value.trim();

  const hauskeepr_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (appointment_date && appointment_time && hours && notes) {
    let datetime = appointment_date + ' ' + appointment_time;
    const response = await fetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify({
        datetime,
        hauskeepr_id,
        "status": "Requested",
        hours,
        notes,
        total_cost
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      window.location.replace('/booking/success')
    } else {
      alert(response.statusText);
    }
  }
}

function calculateCost(){
  let hours = document.querySelector('#appointment_hours').value.trim();
  let hourly_rate = document.querySelector('#hourly_rate').value.trim();
  let total_cost = hours * hourly_rate;
  document.querySelector('#appointment_cost').value = total_cost;
}

document.querySelector('.book-form').addEventListener('submit', appointmentFormHandler);
document.querySelector('#appointment_hours').addEventListener('blur', calculateCost);

