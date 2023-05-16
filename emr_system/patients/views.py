from django.shortcuts import render, redirect
from .forms import PatientForm
from .models import Patient

def patient_list(request):
    patients = Patient.objects.all()
    template = 'patients/patient_list.html'
    return render(request, template, {'patients': patients})

def add_patient(request):
    template = 'patients/patient_list.html'
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('patients:patient_list')
    else:
        form = PatientForm()
    return render(request, template, {'form': form})
