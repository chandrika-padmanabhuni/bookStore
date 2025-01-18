
from django.urls import path
from store import views
from store.views import BookReg,BookList,BookDetail,BookUpdate,BookDelete
# app_name = "WORDSWORTH"

urlpatterns = [
    path('about', views.about, name = 'about'),
    path('blog', views.blog, name = 'blog'),
    path('categories', views.categories, name = 'categories'),
    path('contact', views.contact, name = 'contact'),
    path('index', views.index, name = 'index'),
    path('science', views.science, name = 'science'),
    path('cart', views.cart, name = 'cart'),

    path('Bookreg',BookReg.as_view(),name='Bookreg'),
    path('<pk>/Bookdetail',BookDetail.as_view(),name='Bookdetail'),
    path('',BookList.as_view(),name='Booklist'),
    path('<pk>/Bookupdate',BookUpdate.as_view(),name='Bookupdate'),
    path('<pk>/Bookdelete',BookDelete.as_view(),name='Bookdelete'),
    

    path('Book',views.book, name = 'Book'),
    path('form', views.form,name  = 'form'),
    path('detail/<int:id>', views.detail, name = 'detail'),
    path('update/<int:id>', views.update, name = 'update'),
    path('delete/<int:id>', views.delete, name = 'delete'),
    
    

]



    