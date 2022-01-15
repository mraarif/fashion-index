import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumber(PageNumberPagination):
    page_size = 12

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'lastPage': math.ceil((self.page.paginator.count / self.page_size)),
            'countItemsOnPage': len(data),
            'current': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
