from mongoengine import Q
from rest_framework_mongoengine.generics import ListAPIView
from apps.indexer.models import Product
from apps.indexer.serializers import ProductSerializer
from fashion_index.pagination import CustomPageNumber


class ProductListView(ListAPIView):
    lookup_field = 'id'
    serializer_class = ProductSerializer
    pagination_class = CustomPageNumber

    def get_queryset(self):
        queryset = Product.objects.all()
        search_term = self.request.query_params.get('search')
        if search_term:
            queryset = queryset.filter(Q(product_title__icontains=search_term) |
                                       Q(product_description__icontains=search_term))
        return queryset
