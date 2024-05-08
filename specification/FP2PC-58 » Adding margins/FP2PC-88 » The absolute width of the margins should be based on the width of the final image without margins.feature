@FP2PC-58 @ignore
Feature: Adding margins
  As a user
  I want to be able to add margins to my photo(s)
  So I can compensate for my printer's inaccuracies

  @FP2PC-82
  Rule: The reference for calculating the concrete margins is the size of the final image without the margin

  @FP2PC-88
  Scenario: The absolute width of the margins should be based on the width of the final image without margins
    Given the user selected a Flickr photo
    When the user specifies a horizontal margin of 10 percent
    And the user specifies no vertical margin
    And the user starts the conversion process
    Then the horizontal margin should have increased the width of the final image by 10 percent
