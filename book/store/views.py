from django.shortcuts import render
from django.views.generic import CreateView,DetailView,UpdateView,DeleteView,ListView
from store.models import(Book)

# Create your views here.

def about(request):
      return render(request, 'about.html')

def blog(request):
      return render(request, 'blog.html')

def categories(request):
      return render(request, 'categories.html')

def contact(request):
      return render(request, 'contact.html')

def index(request):
      return render(request, 'index.html')

def science(request):
      return render(request, 'science.html')

def cart(request):
      return render(request, 'cart.html')

def book1(request):
      return render(request, 'book1.html')



class BookReg(CreateView):
    model=Book
    fields='__all__'
    template_name='Bookreg.html'
    success_url="/"

class BookList(ListView):
    model=Book
    template_name='Booklist.html'

class BookDetail(DetailView):
    model=Book
    template_name='Bookdetail.html'

class BookUpdate(UpdateView):
    model=Book
    fields='__all__'
    template_name='Bookupdate.html'
    success_url="/"

class BookDelete(DeleteView):
    model=Book
    fields='__all__'
    template_name='Bookdelete.html'
    success_url="/"

from django.shortcuts import render, redirect, get_object_or_404

from .models import Book
from .forms import BookForm

def book(request):
    stu = Book.objects.all()
    context = {'stu': stu}
    return render(request, 'book.html', context)


def detail(request, id):
	data = Book.objects.get(id = id)	
	context = {'data':data}
	return render(request,'detail.html', context)


def update(request, id):
	obj = get_object_or_404(Book, id =id)
	form = BookForm(request.POST or None, instance = obj)
	data = Book.objects.get(id = id)
	if form.is_valid():
		form.save()
		return redirect('Book')

	context = {'form':form, 'data':data}
	return render(request,'update.html', context )


def delete(request, id):
	data = Book.objects.get(id = id)
	context = {'data':data}
	if request.method =='POST':
		data.delete()
		return redirect('form')
	return render(request,'delete.html', context )


def form(request):
    stu = Book.objects.all() 

    form = BookForm
    if request.method =="POST":
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('Book')  

    context = {'stu': stu, 'form': form}
    return render(request, 'form.html', context)


   