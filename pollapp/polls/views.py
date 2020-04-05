from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from .models import Question, Choice
from django.urls import reverse
from django.views import generic


class IndexView(generic.ListView):
    model = Question
    template_name = 'index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'detail.html'



class ResultsView(generic.DetailView):
    model = Question
    template_name = 'results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    choice_id = int(request.POST.get('choice', '0').strip())
    if choice_id is 0:
        return HttpResponseRedirect(reverse('detail', args=(question.id,)))

    result = Choice.objects.filter(pk=choice_id)
    choice = result[0] if result else None
    if not choice:
        return render(request, 'detail.html', context=dict(
            question=question,
            error_message='Choice selected does not exist',
            default_choice_id=choice_id
        ))
    choice.votes += 1
    choice.save()
    return HttpResponseRedirect(reverse('results', args=(question.id,)))
