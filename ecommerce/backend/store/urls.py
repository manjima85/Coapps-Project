from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views


urlpatterns = [
    path('login/',views.login,name='login'),
    path('products/',views.get_products),
    path('products/<int:productId>/', views.product_details, name='product-detail'),
    path('related-products/', views.products_by_category, name='products-by-category'),
    path('cart/', views.get_cart_items, name='get_cart_items'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
]