from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator


class CustomPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 100
    page_size_query_param = 'page_size'

    # Override `paginate_queryset()` to return the paginated results
    def paginate_queryset(self, queryset, request, view=None):
        # Use Django's built-in Paginator class to paginate the queryset
        paginator = Paginator(queryset, self.get_page_size(request))
        page_number = request.query_params.get(self.page_query_param, 1)
        page = paginator.get_page(page_number)

        return page
