class Participant:
    def __init__(self, participant=None):
        self.participant = participant
    
    def set(self, participant):
        self.participant = participant

    def get(self):
        return self.participant