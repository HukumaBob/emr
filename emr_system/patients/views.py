from django.shortcuts import render, redirect
from .forms import PatientForm
from .models import Patient

def patient_list(request):
    patients = Patient.objects.all()
    return render(request, 'patients/patient_list.html', {'patients': patients})

def add_patient(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('patients:patient_list')
    else:
        form = PatientForm()
    return render(request, 'patients/add_patient.html', {'form': form})
