from rest_framework.pagination import CursorPagination


class CustomPagination(CursorPagination):
    page_size = 10
    max_page_size = 100
    ordering = 'id'

    # Override `get_cursor()` to return the cursor value for the next page of results
    def get_cursor(self, queryset):
        if len(self.page) == 0:
            return None
        return getattr(self.page[-1], self.ordering)

    # Override `paginate_queryset()` to return the paginated results
    def paginate_queryset(self, queryset, request, view=None):
        # Get the cursor value from the request
        cursor = request.query_params.get('cursor')

        # Set the initial queryset and ordering
        qs = queryset.order_by(self.ordering)

        # If a cursor is provided, filter the queryset based on the cursor
        if cursor:
            qs = qs.filter(**{f"{self.ordering}__lt": cursor})

        # Use Django's built-in pagination methods to paginate the queryset
        page = self.django_paginator.get_page(qs, self.get_page_size(request), self.get_max_page_size(request))

        return page
